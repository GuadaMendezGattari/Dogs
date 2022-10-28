const {Router} = require('express');
const router = Router();
const {Temperament, Dog} = require('../db');

router.get('/', async (req, res) => {
    try {
        const temps = await Temperament.findAll();
        res.send(temps);
    } catch(e) {
        console.log(e);
        res.status(404).json({msg: 'Hubo un error en el pedido de temperamentos'});
    }
});

module.exports = router;
