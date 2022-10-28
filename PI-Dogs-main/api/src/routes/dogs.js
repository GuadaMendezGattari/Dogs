const {Router} = require('express');
const router = Router();
const axios = require('axios');
const {Dog, Temperament} = require('../db');
const {API_KEY} = process.env

const getInfoApi = async () => {
    let dogsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    dogsApi = dogsApi.data.map(el => {
        return {
            weight: el.weight.metric + ' kg',
            height: el.height.metric + ' cm',
            id: el.id,
            name: el.name,
            life_span: el.life_span,
            temperament: el.temperament,
            image: el.image.url
        };
    });
    return dogsApi;
};

/* 
{
    "weight":{
        "imperial":"6 - 13",
        "metric":"3 - 6"
    },
    "height":{
        "imperial":"9 - 11.5",
        "metric":"23 - 29"
    },
    "id":1,
    "name":"Affenpinscher",
    "bred_for":"Small rodent hunting, lapdog",
    "breed_group":"Toy",
    "life_span":"10 - 12 years",
    "temperament":"Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
    "origin":"Germany, France",
    "reference_image_id":"BJa4kxc4X",
    "image":{
        "id":"BJa4kxc4X",
        "width":1600,
        "height":1199,
        "url":"https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg"
    }
}
*/

const getInfoDb = async () => {
    let dogsDb = await Dog.findAll({include: Temperament});
    return dogsDb;
};

const getAllInfo = async () => {
    const api = await getInfoApi();
    const db = await getInfoDb();
    return api.concat(db);
};


router.get('/', async (req, res) => {
    const {name} = req.query;
    try {
        let dogs = await getAllInfo();
        dogs = dogs.map(el => {
            return {
                id: el.id,
                image: el.image ? el.image : 'No hay foto',
                name: el.name,
                temperament: el.temperament ? el.temperament : el.temperaments,
                weight: el.weight,
                createdInDb: el.createdInDb ? true : false
            }
        })
        if(!name) res.send(dogs);
        else {
            dogs = dogs.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
            !dogs.length ? res.send({msg: 'No hay perros con ese nombre'}) : res.send(dogs);
        }
    } catch (e) {
        console.log(e);
        res.status(404).json({message: 'Ha ocurrido un error en el pedido a api o database'});
    }
});

router.get('/:idRaza', async (req, res) => {
    const {idRaza} = req.params;
    try {
        let dogs = await getAllInfo();
        const dog = dogs.find(el => el.id.toString() === idRaza);
        res.send(dog);
    } catch (e) {
        console.log(e);
        res.status(404).json({message: 'Ha ocurrido un error en el pedido a api o database'});
    }
});

router.post('/', async (req, res) => {
    const {name, height, weight, life_span, temperaments} = req.body;
    try {
        const dog = await Dog.create({name, height, weight, life_span});
        const temperament = await Temperament.findAll({where: {name: temperaments}});
        dog.addTemperament(temperament);
        res.send('Dog agregado exitosamente');
    } catch (e) {
        console.log(e);
        res.status(404).json({message: 'Ha ocurrido un error en el post a la database'});
    }
});

module.exports = router;

