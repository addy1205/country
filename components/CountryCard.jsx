import { Link } from "react-router";

const CountryCard = ({ name, flag, population, region, capital, data }) => {
  return (
    <Link className="country-desc" to={`/${name}`} state={data}>
      <div className="flag-container">
        <img src={flag} alt={name + " flag"} />
      </div>
      <div className="country-content">
        <h3 className="country-name">{name}</h3>
        <p>
          <b>Population: </b>
          {population.toLocaleString("en-IN")}
        </p>
        <p>
          <b>Region: </b>
          {region}
        </p>
        <p>
          <b>Capital: </b>
          {capital}
        </p>
      </div>
    </Link>
  );
};

export default CountryCard;
