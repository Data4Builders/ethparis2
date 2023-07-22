const axios = require('axios');

module.exports = async (req, res) => {
  const url = req.body.url;
  try {
    const response = await axios.get(url);
    res.send(response.data);
  } catch (error) {
    res.send(error);
  }
};
