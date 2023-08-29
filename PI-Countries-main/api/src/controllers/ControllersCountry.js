const { Op } = require("sequelize");
const axios = require("axios");
const { Country, Activity } = require("../db");

const getCountriesApi = async () => {
  const apiUrl = await axios.get(
    "https://rest-countries.up.railway.app/v3/all"
  ); //cambio de link
  const apiInfo = await apiUrl.data;

  const bdinfo = apiInfo.map(async (element) => {
    await Country.findOrCreate({
      where: {
        name: element.name.common,
        id: element.cca3,
        flags: element.flags ? element.flags[0] : "flag not found",
        capital: element.capital ? element.capital[0] : "capital not found",
        continents: element.continents[0],
        subRegion: element.subregion
          ? element.subregion
          : "subRegion not found",
        area: element.area.toString(),
        population: element.population,
      },
    });
  });

  return bdinfo;
};

const getAllCountries = async (req, res) => {
  let allCountries = [];

  try {
    const records = await Country.count();
    if (records < 250) {
      allCountries = await getCountriesApi();
    }
    const name = req.query.name;
    if (name) {
      allCountries = await Country.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: [
          {
            model: Activity,

            through: { attributes: [] },
          },
        ],
      });

      if (allCountries.length === 0) {
        return res.status(404).json({ statusText: "404 Countries Not Fount" });
      }
      return res.json(allCountries);
    } else {
      allCountries = await Country.findAll({
        include: [
          {
            model: Activity,

            through: { attributes: [] },
          },
        ],
      });
      return res.json(allCountries);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getCountryById = async (req, res) => {
  try {
    const idPais = req.params.idPais.toUpperCase();
    const country = await Country.findByPk(idPais, {
      include: [
        {
          model: Activity,

          through: { attributes: [] },
        },
      ],
    });
    if (country === null) {
      return res.status(404).json({ statusText: "404 id Not Fount" });
    }
    return res.json(country);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { getAllCountries, getCountryById };
