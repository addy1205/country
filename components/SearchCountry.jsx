const SearchCountry = ({setQuery}) => {
  return (
    <>
      <div className="search-container">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Search for a Country..." onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
      </div>
    </>
  );
};

export default SearchCountry;
