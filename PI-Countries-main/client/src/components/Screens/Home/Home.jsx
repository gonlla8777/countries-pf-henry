import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCountryByName, getCountries } from "../../../redux/actions";
import Filter from "../../Filter/Filter.jsx";
import { Link } from "react-router-dom";
import Card from "../../Card/Card.jsx";
import "./Home.css";
export default function Home2() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  let actualPag = useSelector((state) => state.currentPage);
  const dataApi = useSelector((state) => state.countries);
  console.log(actualPag);
  console.log("en medio de los dos");
  console.log(dataApi);

  let [inicio, setInicio] = useState(0);
  let [pag, setPag] = useState(10);

  //Aqui comienza el paginado
  function onClickPagePrev() {
    console.log("pasa por aqui");
    if (inicio <= 10) {
      return setInicio(0), setPag(10);
    }

    if (inicio > 10) {
      return setPag(pag - 10), setInicio(inicio - 10);
    }
  }

  function onClickPageNext() {
    console.log("pasa por Next");
    if (pag > 240) {
      console.log("aqui esta la pagina total");
      console.log(pag);
      console.log(inicio);
      return setInicio(240), setPag(250);
    }
    console.log(actualPag);
    return (
      setPag(pag + 10),
      setInicio(inicio + 10),
      console.log(dataApi.length),
      console.log(pag),
      console.log(inicio)
    );
  }
  console.log(dataApi);
  const currentCountries = dataApi.slice(inicio, pag);
  console.log(dataApi, +"despues de pasar por coso");

  const [input, setInput] = useState("");

  const onClickHandler = (e) => {
    e.preventDefault();
    inicio = 0;
    pag = 250;
    input.length > 0 && dispatch(getCountryByName(input));
    setInput("");
  };
  const inputHandler = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  function onClickPageValue() {
    console.log("pasa por Next");
    if (pag > 240) {
      console.log("aqui esta la pagina total");
      console.log(pag);
      console.log(inicio);
      return setInicio(240), setPag(250);
    }
    console.log(actualPag);
    return (
      setPag(pag + 10),
      setInicio(inicio + 10),
      console.log(dataApi.length),
      console.log(pag),
      console.log(inicio)
    );
  }

  function onClickPageValuePrev() {
    return setInicio(inicio - 10), setPag(pag - 10);
  }

  function onClickPageValueNext() {
    return setInicio(inicio + 10), setPag(pag + 10);
  }

  //Click Reset
  function onClickReset() {
    dispatch(getCountries());
    setInicio(0);
    setPag(10);
  }

  return (
    <div className="containerHome">
      <div className="columnHome column-1home ">
        <div
          style={{
            position: "fixed",
            backgroundColor: "#f7f7f7",
            padding: "20vh",
          }}
        >
          <div style={{ paddingBottom: "50px", with: "1000px  " }}>
            <Link to="/">
              <button className="button2home" onClick={onClickReset}>
                Back
              </button>
            </Link>
          </div>
          <div style={{ paddingBottom: "50px", with: "1000px  " }}>
            <Link to="/AddActivity">
              <button className="button2home">ADD ACTIVITY</button>
            </Link>
          </div>
          <form
            style={{
              alignItems: "center",
              backgroundColor: " 	#DCDCDC",
              padding: "5px",
              borderRadius: "10px",
              marginBottom: "65px",
            }}
            onSubmit={onClickHandler}
          >
            <input
              className="button2home"
              type="text"
              placeholder="ID - NAME"
              name="input"
              value={input}
              onChange={(e) => inputHandler(e)}
            />
            <button className="button2home" style={{ fontSize: "15px" }}>
              {" "}
              Serch Now! 🔍
            </button>
          </form>
          <button className="button2home">
            <p style={{ margin: "5px", color: "black" }}>FILTROS</p>
            <Filter />
          </button>
          <button
            className="button2home"
            onClick={onClickReset}
            style={{ marginTop: "20px" }}
          >
            Reset
          </button>
          <div className="pag">
            <button
              className={inicio === 0 ? "display-false" : "button2home"}
              onClick={onClickPagePrev}
            >
              Prev
            </button>{" "}
            <button
              className={inicio === 0 ? "display-false" : "button2home"}
              onClick={onClickPageValuePrev}
            >
              {pag / 10 - 1}
            </button>
            <button
              className="button2home"
              style={{ backgroundColor: "#dddd10" }}
            >
              {pag / 10}
            </button>
            <button
              className={inicio === 240 ? "display-false" : "button2home"}
              onClick={onClickPageValueNext}
            >
              {pag / 10 + 1}
            </button>
            <button
              className={inicio === 240 ? "display-false" : "button2home"}
              onClick={onClickPageNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <div className="columnHome column-2home  ">
        {
          <div
            style={{
              float: "left",
              width: "100px",
              height: "100px",
              margin: "3px",
              padding: "3px",
            }}
          >
            {currentCountries.length > 0 ? (
              currentCountries.map((c) => (
                <Card
                  idPais={c.id}
                  key={c.id}
                  urlImg={c.flags}
                  name={c.name}
                  continent={c.continents}
                />
              ))
            ) : (
              <span className="error">ERROR: Country not found...</span>
            )}
          </div>
        }
      </div>
    </div>
  );
}
