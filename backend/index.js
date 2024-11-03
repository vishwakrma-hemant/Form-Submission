const multer = require('multer');
const pool = require('./connection');
const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(parser.json());

app.use(express.static(path.join(__dirname, './static/upload')));

app.get('/getall', (req, res) => {
    pool.query('SELECT * FROM school', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error in retrieving data');
        } else {
            res.send(result);
        }
    });
});

app.get('/getall/:id', (req, res) => {
    pool.query('SELECT * FROM school WHERE id=?', [req.params.id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.delete('/getall/del/:id', (req, res) => {
    pool.query('DELETE FROM school WHERE id=?', [req.params.id], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './static');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const newName = path.basename(file.originalname, ext) + '-' + Date.now() + ext;
        cb(null, newName);
    }
});

const upload = multer({ storage: storage });

app.post('/insert', upload.single('image'), (req, res) => {
    const { name, email, contact, address, city, state } = req.body;
    if (!email) {
        return res.status(400).send('Email is required');
    } else if (isNaN(contact) || !contact) {
        return res.status(400).send('Contact is required');
    } else if (!name) {
        return res.status(400).send('Name is required');
    }
    const image = req.file ? req.file.path : '';
    const query = `INSERT INTO school (name, email, contact, address, city, state, image) VALUES (?,?,?,?,?,?,?)`;
    pool.query(query, [name, email, contact, address, city, state, image], (err, result) => {
        if (err) {
            console.log("Error in Inserting Data", JSON.stringify(err, undefined, 2));
            res.status(500).send('Error in Inserting Data');
        } else {
            console.log(result);
            res.send({ message: 'Data Inserted Successfully', filePath: `${req.file.filename}` });
        }
    });
});

app.get('/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, `static/${filename}`));
});

app.listen(9000, () => {
    console.log('Server Started');
});
