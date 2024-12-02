import React, { useEffect, useState } from "react";
import "./CountryDetail.css";
import { Link, useLocation, useParams } from "react-router";
import { useTheme } from "../hooks/useTheme";
import CountryDetailShimmer from "./CountryDetailShimmer";

const CountryDetail = () => {
  const [countryData, setCountryData] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const params = useParams();
  const countryName = params.country;
  const { state } = useLocation();
  const [isDark] = useTheme();

  function updateCountryData(data) {
    setCountryData({
      name: data.name.common || data.name,
      nativeName: Object.values(data.name.nativeName || {})[0]?.common,
      population: data.population.toLocaleString("en-IN"),
      region: data.region,
      subRegion: data.subregion,
      capital: data.capital,
      topLevelDomain: data.tld.join(", "),
      currencies: Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(",  "),
      languages: Object.values(data.languages || {}).join(",  "),
      imgUrl: data.flags.svg,
      borders: [],
    });

    if (!data.borders) {
      data.borders = [];
    }

    Promise.all(
      data.borders.map((border) => {
        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => borderCountry.name.common);
      })
    ).then((borders) => {
      setCountryData((prevState) => ({ ...prevState, borders }));
    });
  }

  useEffect(() => {
    if (state) {
      updateCountryData(state);
      return;
    }

    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        updateCountryData(data);
      })
      .catch((err) => {
        setNotFound(true);
      });
  }, [countryName]);

  if (notFound) {
    return <div>Country Not Found...</div>;
  }

  return (
    <>
      <main className={`${isDark ? "dark" : ""}`}>
        <div className="single-country-page">
          <span className="back-btn" onClick={() => history.back()}>
            <i className="fa-solid fa-arrow-left"></i> &nbsp;Back
          </span>
          {countryData === null ? (
            <CountryDetailShimmer />
          ) : (
            <div className="countries-details">
              <img src={countryData.imgUrl} alt="" />
              <div className="more-details-container">
                <h1>{countryData.name}</h1>
                <div className="more-details">
                  <p>
                    <b>Native Name: </b>
                    <span className="native-name">
                      {countryData.nativeName || countryData.name}
                    </span>
                  </p>
                  <p>
                    <b>Population: </b>
                    <span className="population">{countryData.population}</span>
                  </p>
                  <p>
                    <b>Region: </b>
                    <span className="region"></span>
                    {countryData.region}
                  </p>
                  <p>
                    <b>Sub Region: </b>
                    <span className="sub-region">{countryData.subRegion}</span>
                  </p>
                  <p>
                    <b>Capital: </b>
                    <span className="capital">
                      {countryData.capital?.join(", ")}
                    </span>
                  </p>
                  <p>
                    <b>Top Level Domain: </b>
                    <span className="domain">{countryData.topLevelDomain}</span>
                  </p>
                  <p>
                    <b>Currencies: </b>
                    <span className="currencies">{countryData.currencies}</span>
                  </p>
                  <p>
                    <b>Languages: </b>
                    <span className="languages">{countryData.languages}</span>
                  </p>
                </div>
                {countryData.borders.length !== 0 && (
                  <div className="border-countries">
                    <b>Border Countries:</b> &nbsp;
                    {countryData.borders.map((border) => (
                      <Link to={`/${border}`}>{border}</Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default CountryDetail;
