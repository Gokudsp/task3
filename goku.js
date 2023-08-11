const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());



const userdetails = [];

// Create a new user
app.post('/userdetails', async (req, res) => {
  try {
    const { username, password,dept} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    userdetails.push({ username, password,dept: hashedPassword });

    res.status(201).send('User created successfully');
  } 
  catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/userdetails', async (req, res) => {
  try {
    const decryptedUsers = [];

    for (const user of userdetails) {
      const { username, password ,dept } = user;
      const decryptedPassword = await bcrypt.compare(password, 10);
      decryptedUsers.push({ username, password ,dept: decryptedPassword });
    }

    res.status(200).json(decryptedUsers);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.listen(3000, () => {
  console.log('Server is running ...' + 3000);
});
