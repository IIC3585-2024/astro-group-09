const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 4321;


const dbFilePath = path.join(__dirname, '../../data/db.json');

app.use(bodyParser.json());

app.post('/', async (req, res) => {
  const { name, image, streamingService, seasons, episodesPerSeason, description, category } = req.body;
  console.log('New series creation in process');

  try {
    // Leer el archivo db.json
    const data = await fs.readFile(dbFilePath, 'utf8');
    const db = JSON.parse(data);

    // Generar un nuevo ID para la serie
    const newSeriesId = db.series.length + 1;

    // Crear el objeto de la nueva serie
    const newSeries = {
      id: newSeriesId,
      name,
      image,
      streamingService,
      seasons: parseInt(seasons),
      episodesPerSeason: episodesPerSeason.split(',').map(Number),
      description,
      category
    };

    // Agregar la nueva serie al arreglo existente
    db.series.push(newSeries);

    // Guardar el archivo db.json actualizado
    await fs.writeFile(dbFilePath, JSON.stringify(db, null, 2));

    // Redirigir de vuelta a la página principal de blog
    res.redirect('http://localhost:4321/blog/');
  } catch (error) {
    console.error('Error handling add series:', error);
    res.status(500).json({ error: 'Error handling add series' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});