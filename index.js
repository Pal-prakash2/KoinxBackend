const express = require('express');
const mongoose = require('mongoose');
const fetchCryptoData = require('./services/fetchCryptoData');
const statsRouter = require('./routes/stats');
const deviationRouter = require('./routes/deviation');

const app = express();
const PORT = process.env.PORT || 3000;

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://<wontputactualusername>:,<password>@<wontputactualprojectname>.mongodb.net/crypto-stats?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB Atlas');
  fetchCryptoData(); // Initial fetch
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

app.use(express.json());
app.use('/api', statsRouter);
app.use('/api', deviationRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});