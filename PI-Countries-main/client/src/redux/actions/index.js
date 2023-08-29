import axios from "axios";

import {
  GET_COUNTRIES,
  GET_COUNTRIES_BY_NAME,
  GET_COUNTRYDETAIL,
  FILTER_BY_CONTINENT,
  FILTER_BY_ACTIVITY,
  ORDER_BY_NAME,
  ORDER_BY_POPULATION,
  ADD_ACTIVITY,
} from "../constants/index.js";

export function getCountries() {
  return async (dispatch) => {
    let json = await axios.get("http://localhost:3001/countries/");
    dispatch({ type: GET_COUNTRIES, payload: json.data });
  };
}

export function getCountryByName(name) {
  return async (dispatch) => {
    try {
      const json = await axios.get(
        `http://localhost:3001/countries?name=${name}`
      );
      dispatch({ type: GET_COUNTRIES_BY_NAME, payload: json.data });
    } catch (error) {
      dispatch({ type: GET_COUNTRIES_BY_NAME, payload: [], error });
    }
  };
}

export function getCountrydetail(id) {
  console.log(id);
  return async (dispatch) => {
    const json = await axios.get(`http://localhost:3001/countries/${id}`);
    dispatch({ type: GET_COUNTRYDETAIL, payload: json.data });
    console.log(json.data);
  };
}

export function filterByContinent(payload) {
  return {
    type: FILTER_BY_CONTINENT,
    payload: payload,
  };
}

export function filterByActivity(payload) {
  return {
    type: FILTER_BY_ACTIVITY,
    payload: payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload: payload,
  };
}

export function orderbyPopulation(payload) {
  return {
    type: ORDER_BY_POPULATION,
    payload: payload,
  };
}

export function addActivity(payload) {
  return async function (dispatch) {
    try {
      const post = await axios.post(
        "http://localhost:3001/activities",
        payload
      );

      return dispatch({
        type: ADD_ACTIVITY,
        payload: post,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
