import { useState } from "react";
import CountriesList from "./CountriesList";
import SearchCountry from "./SearchCountry";
import SelectRegion from "./SelectRegion";
import { useTheme } from "../hooks/useTheme";

const Home = () => {
  const [query, setQuery] = useState("");
  const [isDark] = useTheme()
  return (
    <main className={`${isDark ? "dark" : ""}`}>
      <div className="search-filter-container">
        <SearchCountry setQuery={setQuery} />
        <SelectRegion setQuery={setQuery}/>
      </div>
      <CountriesList query={query} />
    </main>
  );
};

export default Home;
