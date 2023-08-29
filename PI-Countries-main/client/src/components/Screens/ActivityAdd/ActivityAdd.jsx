import React, { useState, useEffect, useRef } from "react";
import { getCountries, addActivity } from "../../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./ActivityAdd.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function ActivityForm() {
  const dispatch = useDispatch();
  const arrayCountries = useSelector((state) => state.countries);
  const arrayActividades = useSelector((state) => state.activities);
  console.log(arrayActividades);

  let countriesList = arrayCountries.map((elements) => {
    return {
      name: elements.name,
    };
  });

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const [errors, setErrors] = useState({});
  const [activity, setActivity] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countries: [],
  });
  const [isModified, setIsModified] = useState(false);
  const refCountry = useRef();
  const refSeason = useRef();

  const validate = (activity) => {
    let errors = {};

    if (!activity.name) {
      errors.name = "Name is required";
    } else if (!activity.duration) {
      errors.duration = "Duration is required";
    } else if (activity.duration > 24 || activity.duration < 1) {
      errors.duration = "Maximum duration from 1 to 24 hours";
    } else if (!activity.difficulty) {
      errors.difficulty = "Difficulty is required";
    } else if (activity.difficulty > 5 || activity.difficulty < 1) {
      errors.difficulty = "Maximum difficulty from 1 to 5";
    } else if (!activity.season) {
      errors.season = "You must select at least one season";
    } else if (!activity.countries.length) {
      errors.countries = "You must select at least one country";
    }
    return errors;
  };

  const handleChange = (e) => {
    setIsModified(true);
    setActivity({
      ...activity,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...activity,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSeasons = (e) => {
    setIsModified(true);
    if (
      e.target.value !== "Select" &&
      !activity.season.includes(e.target.value)
    ) {
      setActivity({
        ...activity,
        season: e.target.value,
      });
    }
    setErrors(
      validate({
        ...activity,
        season: e.target.value,
      })
    );
  };

  const handleCountries = (e) => {
    setIsModified(true);
    if (
      e.target.value !== "Select" &&
      !activity.countries.includes(e.target.value)
    ) {
      setActivity({
        ...activity,
        countries: [...activity.countries, e.target.value],
      });
    }
    setErrors(
      validate({
        ...activity,
        countries: [...activity.countries, e.target.value],
      })
    );
  };

  const deleteCountry = (c) => {
    setIsModified(true);
    setActivity({
      ...activity,
      countries: activity.countries.filter((country) => country !== c),
    });
    setErrors(
      validate({
        ...activity,
        countries: activity.countries.filter((country) => country !== c),
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addActivity(activity));
    alert("Activity added successfully!");
    setActivity({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countries: [],
    });
    setIsModified(false);
    refCountry.current.selectedIndex = 0;
    refSeason.current.selectedIndex = 0;
  };

  return (
    <>
      <div
        style={{
          marginTop: "60px",
          backgroundImage: `url("https://media-cldnry.s-nbcnews.com/image/upload/newscms/2018_40/2229681/171116-better-stock-woman-traveling-airport-ew-624p.jpg")`,
          backgroundRepeat: "no-repeat",
          height: "80vh",
        }}
      >
        <div style={{ paddingBottom: "50px", with: "1000px  " }}>
          <Link to="/home">
            <button className="button2home" style={{ width: "200px" }}>
              Back
            </button>
          </Link>
        </div>
        <div className="containertotal">
          <div></div>
          <div className="containerform">
            <h1>Create new activity:</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="form">
                <div className="fields">
                  <div className="field">
                    <p>Name:</p>
                    <input
                      autoComplete="off"
                      onChange={(e) => handleChange(e)}
                      type="text"
                      name="name"
                      value={activity.name}
                      placeholder="Activity name..."
                    />
                    {activity.name == arrayActividades ? (
                      <span> "Ya hiciste esta actividad"</span>
                    ) : (
                      <span>"Bien"</span>
                    )}
                    {errors.name && <span> {errors.name}</span>}
                  </div>

                  <div className="field">
                    <p>Duration (in hours):</p>
                    <input
                      type="number"
                      name="duration"
                      value={activity.duration}
                      onChange={(e) => handleChange(e)}
                      autoComplete="off"
                      placeholder="Duration format: 24hs"
                    />
                    {errors.duration && <span>{errors.duration}</span>}
                  </div>

                  <div className="field">
                    <p>Select season:</p>
                    <select
                      defaultValue={"Select"}
                      name="Season"
                      onChange={(e) => handleSeasons(e)}
                      ref={refSeason}
                    >
                      <option value="Select" disabled>
                        Select an option
                      </option>
                      <option value="Autumn">Autumn</option>
                      <option value="Winter">Winter</option>
                      <option value="Spring">Spring</option>
                      <option value="Summer">Summer</option>
                    </select>
                    {errors.season && <span>{errors.season}</span>}
                  </div>

                  <div className="field">
                    <p>Difficulty:</p>
                    <input
                      type="number"
                      name="difficulty"
                      value={activity.difficulty}
                      onChange={(e) => handleChange(e)}
                      autoComplete="off"
                      placeholder="Difficulty 1 to 5"
                    />
                    {errors.difficulty && <span>{errors.difficulty}</span>}
                  </div>
                  <div className="field">
                    <p> Select countries:</p>
                    <select
                      defaultValue={"select"}
                      name="country name"
                      onChange={(e) => handleCountries(e)}
                      ref={refCountry}
                    >
                      <option value="select" disabled>
                        Select Countries
                      </option>
                      {countriesList?.map((c) => (
                        <option value={c.name} key={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    {errors.countries && <span>{errors.countries}</span>}
                  </div>
                  <p className="listCountries"> Countries:</p>
                  <div className="displayCountries">
                    {activity.countries.map((country) => {
                      return (
                        <div key={country} className="country">
                          <p>{country}</p>
                          <button
                            className="bttonsec"
                            onClick={(e) => {
                              deleteCountry(country);
                            }}
                          >
                            ✕
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <button
                      className="bttonprim"
                      type="submit"
                      disabled={Object.keys(errors).length !== 0 || !isModified}
                    >
                      Add Activity
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
