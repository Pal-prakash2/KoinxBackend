const axios = require('axios');
const Crypto = require('../models/Crypto');
const cron = require('node-cron');

const fetchCryptoData = async () => {
  const coins = ['bitcoin', 'matic-network', 'ethereum'];
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    for (const coin of coins) {
      const cryptoData = new Crypto({
        coin,
        price: data[coin].usd,
        marketCap: data[coin].usd_market_cap,
        change24h: data[coin].usd_24h_change
      });
      await cryptoData.save();
    }
  } catch (error) {
    console.error('Error fetching data from CoinGecko:', error);
  }
};

// Schedule the job to run every 2 hours
cron.schedule('0 */2 * * *', fetchCryptoData);

module.exports = fetchCryptoData;