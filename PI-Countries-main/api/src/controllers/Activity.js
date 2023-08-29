const { Op } = require("sequelize");
const { Country, Activity } = require("../db");

const newActivity = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;

  try {
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    const arrayCountries = [];

    for (let c of countries) {
      let countryBydb = await Country.findOne({
        where: {
          name: {
            [Op.iLike]: `%${c}%`,
          },
        },
      });
      arrayCountries.push(countryBydb);
    }

    for (let c of arrayCountries) {
      await newActivity.addCountry(c);
    }

    const recordAct = await Activity.findByPk(newActivity.id, {
      include: [
        {
          model: Country,

          through: { attributes: [] },
        },
      ],
    });

    res.json(recordAct);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports = { newActivity };
