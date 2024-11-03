'use client';
import { Grid } from '@mantine/core';
import { Card, Image, Text, Group, Badge, Button } from '@mantine/core';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [items, setItems] = useState([]);

  // const fetchImageData = () => {
  //   fetch('http://localhost:9000')
  //     .then((response) => {
  //       if (response.status === 200) {
  //         response.json().then((result) => {
  //           console.log(result);
  //           // Set the image data in state or do something with it
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  const fetchUserData = () => {
    fetch('http://localhost:9000/getall')
      .then((response) => {
        if (response.status === 200) {
          response.json().then((result) => {
            console.log(result);
            setItems(result);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUserData();
    // fetchImageData();
  }, []);


  return (
    <Grid py={100} px={'md'}>
      {items.length > 0 ? (
        items.map((item, index) => (
          <Grid.Col key={index} span={{ base: 12, xs: 4 }}>
            <Card withBorder radius="md">
              <Card.Section>
                <Image src={`http://localhost:9000/${item.image}`} alt={item.name} height={180} />
              </Card.Section>

              <Card.Section mt="md" px={'md'}>
                <Group justify="apart">
                  <Text fz="md" fw={500}>
                    {item.name}
                  </Text>
                  <Badge size="sm" variant="light">
                    {item.city}
                  </Badge>
                </Group>
                <Text fz="sm" mt="xs">
                  {item.address}
                </Text>
              </Card.Section>

              <Group mt="xs">
                <Button
                  radius="md"
                  style={{ flex: 1, letterSpacing: 1 }}
                  // onClick={() => del(item._id)}
                >
                  Delete
                </Button>
              </Group>
            </Card>
          </Grid.Col>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </Grid>
  );
};

export default Page;
