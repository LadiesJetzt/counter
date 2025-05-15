const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors'); // Für Cross-Origin Anfragen

const app = express();
const PORT = 3002;
const COUNTER_FILE = path.join(__dirname, 'counter.json');

// CORS aktivieren, damit Ihre Hauptwebsite auf diesen Service zugreifen kann
app.use(cors());

// Sicherstellen, dass die Counter-Datei existiert
if (!fs.existsSync(COUNTER_FILE)) {
  fs.writeFileSync(COUNTER_FILE, JSON.stringify({ count: 0 }));
}

// Route zum Abrufen des Zählerstands
app.get('/counter', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(COUNTER_FILE, 'utf8'));
    res.json(data);
  } catch (error) {
    console.error('Fehler beim Lesen des Zählers:', error);
    res.status(500).json({ error: 'Fehler beim Lesen des Zählers' });
  }
});

// Route zum Erhöhen des Zählers
app.get('/increment', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(COUNTER_FILE, 'utf8'));
    data.count += 1;
    fs.writeFileSync(COUNTER_FILE, JSON.stringify(data));
    res.json(data);
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Zählers:', error);
    res.status(500).json({ error: 'Fehler beim Aktualisieren des Zählers' });
  }
});

// Server starten
app.listen(PORT, () => {
  console.log(`Besucherzähler-Server läuft auf Port ${PORT}`);
});

