// // pages/api/upload.js
// // import nextConnect from 'next-connect';
// const multer = require('multer');

// const express = require('express');



// const upload = multer({ dest: './static/upload' });

//  router = express({
//   onError(error, req, res) {
//     res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
//   },
//   onNoMatch(req, res) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// });

// router.use(upload.single('image'));

// router.post((req, res) => {
//   res.status(200).json({ message: 'Upload successful' });
// });


// router.post('/upload', upload.single('image'), (req, res) => {
//     res.status(200).json({ message: 'Upload successful' });
// });

// module.exports = router;
// ;
// // exports.module = router;