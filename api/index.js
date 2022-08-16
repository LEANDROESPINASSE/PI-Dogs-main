//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const { getApiDogs } = require("./src/Controllers/DogsController");
const server = require("./src/app.js");
const { Temperament } = require("./src/db.js")
const { conn } = require("./src/db.js");

const ulTemp = async () => {
  try {
    const apiTemperaments = await getApiDogs();

    let temperamentapi = apiTemperaments
      .map((element) => element.temperament?.split(","))
      .flat(); // element.temperament)

    temperamentapi.forEach(async (temp) => {
      if (!temp) return;
      const [createdTemp, isCreated] = await Temperament.findOrCreate({
        where: {
          name: temp,
        },
        defaults: {
          name: temp,
        },
      });
      console.log(isCreated);
    });
    return
  } catch (error) {
    console.log("Temperament creation Error", error);
  }
};

// Syncing all the models at once.

conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
    ulTemp();
  });
});
