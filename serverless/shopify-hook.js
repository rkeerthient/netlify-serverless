const handler = async (req, context) => {
  console.log(JSON.stringify(req));
  console.log(JSON.stringify(context));
  try {
    const { city, country } = JSON.parse(req.body);
    return { statusCode: 500, body: `You're visiting ${city} in ${country}!` };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
