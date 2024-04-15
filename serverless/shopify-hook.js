const handler = async (event, context) => {
  console.log(JSON.stringify(event));
  console.log(JSON.stringify(context));
  try {
    const { city, country } = context.params;
    return { statusCode: 500, body: `You're visiting ${city} in ${country}!` };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
