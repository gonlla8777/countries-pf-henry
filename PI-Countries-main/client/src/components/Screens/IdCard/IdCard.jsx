import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCountrydetail } from "../../../redux/actions";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./IdCard.css";

export default function CountryDetail() {
  const countryDetail = useSelector((state) => state.countryDetail);
  console.log(countryDetail);
  const dispatch = useDispatch();
  let { idPais } = useParams();

  useEffect(() => {
    dispatch(getCountrydetail(idPais));
  }, [idPais]);

  return (
    <>
      <div
        style={{
          paddingBottom: "50px",
          with: "1000px ",
          marginTop: "60px",
          justifyContent: "center",
          justifyItems: "center",
        }}
      >
        <Link to="/home">
          <button className="button2home" style={{ width: "200px" }}>
            Back
          </button>
        </Link>
      </div>
      <div className="containertotal">
        <div className="text">
          <div style={{ alignItems: "center" }}>
            {Object.keys(countryDetail).length > 0 && (
              <div className="">
                <h1>{countryDetail.name}</h1>

                <img
                  src={countryDetail.flags}
                  alt="flag img"
                  style={{ width: "100px" }}
                />

                <p>Code: {countryDetail.id}</p>
                <p>Capital: {countryDetail.capital}</p>
                <p>Subregion: {countryDetail.subRegion}</p>
                <p>Area: {countryDetail.area} Km2</p>
                <p>Population: {countryDetail.population} Hab. </p>
              </div>
            )}
          </div>
          <div>
            <div>
              <h2>Avaibable activities:</h2>
            </div>
            {countryDetail.activities ? (
              <div>
                {countryDetail.activities.map((e) => (
                  <div key={e.name}>
                    <p>Name: {e.name}</p>
                    <p>Difficulty: {e.difficulty}</p>
                    <p>Duration: {e.duration}</p>
                    <p>Season: {e.season}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <span>No activities linked...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
