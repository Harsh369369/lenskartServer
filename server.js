const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection string
const uri = 'mongodb+srv://harshgera003:Tesla369@lenskartserver.hgafvfc.mongodb.net/lenskartServer?retryWrites=true&w=majority';
const client = new MongoClient(uri);

app.use(cors());
app.use(express.json());

client.connect()
  .then(() => {
    console.log('Connected to MongoDB');
    const db = client.db('lenskartData');

    // Routes
    app.get('/sections', async (req, res) => {
      try {
        const sections = await db.collection('sections').find({}).toArray();
        res.json(sections);
      } catch (err) {
        res.status(500).send(err);
      }
    });

    app.get('/products', async (req, res) => {
      try {
        const products = await db.collection('products').find({}).toArray();
        res.json(products);
      } catch (err) {
        res.status(500).send(err);
      }
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });
