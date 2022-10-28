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
const server = require('./src/app.js');
const { conn, Dog, Temperament } = require('./src/db.js');
const axios = require('axios');
const {API_KEY} = process.env;

const getInfoApi = async () => {
  let dogsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
  let dogs = dogsApi.data.map(el => el.temperament);
  let d = dogs.map(el => el === undefined || el === null ? [] : el.split(', ')).join().split(',');
  let finalDogs = []
  for(let i = 0; i < d.length; i++) {
    if(finalDogs.includes(d[i]) || d[i] === '') continue;
    finalDogs.push(d[i])
  };
  finalDogs = finalDogs.map(el => {
    return {name: el}
  })
  return finalDogs;
};

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, async () => {
    const temps = await Temperament.findAll();
    if(!temps.length) {
      const apiTemps = await getInfoApi();
      await Temperament.bulkCreate(apiTemps)
    }
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
