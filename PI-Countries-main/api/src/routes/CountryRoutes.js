const { Router } = require('express');
const { getAllCountries , getCountryById } = require('../controllers/ControllersCountry')
const router= Router();

router.get('/', getAllCountries)  
router.get('/:idPais', getCountryById)  

module.exports = router;
