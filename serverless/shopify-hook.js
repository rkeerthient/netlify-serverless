require("dotenv").config();
const handler = async (req, context) => {
  const { variants } = JSON.parse(req.body);
  const latestUpdated = variants.reduce(
    (acc, current) => {
      const accDate = new Date(acc.updated_at);
      const currentDate = new Date(current.updated_at);
      return currentDate > accDate ? current : acc;
    },
    { updated_at: 0 }
  );

  const productVariants = [];

  for (const variant of variants) {
    variant.option1 === latestUpdated.option1 &&
      productVariants.push({
        entityId: variant.id.toString(),
        sku: variant.sku,
        size: variant.option2,
        inventory: variant.inventory_quantity.toString(),
      });
  }
  const variantToUpdate = productVariants[0].entityId;
  const sizeDetailsToUpdate = {
    c_greysonSizeDetails: productVariants,
  };
  console.log(JSON.stringify(sizeDetailsToUpdate));
  console.log(
    `https://${
      process.env.ENV_TYPE === "PRODUCTION" ? "api" : "sbx-api"
    }.us.yextapis.com/v2/accounts/me/entities/${variantToUpdate}?api_key=${
      process.env.API_KEY
    }&v=20220101`
  );
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(sizeDetailsToUpdate),
  };
  await fetch(
    `https://${
      process.env.ENV_TYPE === "PRODUCTION" ? "api" : "sbx-api"
    }.us.yextapis.com/v2/accounts/me/entities/${variantToUpdate}?api_key=${
      process.env.API_KEY
    }&v=20220101`,
    requestOptions
  )
    .then((res) => {
      console.log("Success");
      console.log(JSON.stringify(res));
      console.log(`Status Code: ${res.status}`);
    })
    .catch((e) => console.log(e.message));
};

module.exports = { handler };
