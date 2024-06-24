const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 4321;


const dbFilePath = path.join(__dirname, '../../data/db.json');

app.use(bodyParser.json());
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Leer el archivo db.json
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error reading database' });
      return;
    }

    try {
      const db = JSON.parse(data);

      // Verificar si existe el usuario y la contraseña
      const user = db.users.find((user) => user.username === username && user.password === password);
      if (!user) {
        res.status(401).json({ error: 'Invalid username or password' });
        return;
      }

      res.json({ message: 'Signup successful', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error parsing database' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});