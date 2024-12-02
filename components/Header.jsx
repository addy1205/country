import "../App.css";
import { useTheme } from "../hooks/useTheme";

const Header = () => {
  const [isDark, setIsDark] = useTheme()




  return (
    <header className={`header-container ${isDark ? 'dark' : ''}`}>
      <div className="header-content">
        <h2 className="title">
          <a href="/">Where in the world?</a>
        </h2>
        <div
          className="mode-change-container"
          onClick={() => {
            setIsDark(!isDark);
            localStorage.setItem("isDarkMode", !isDark);
          }}
        >
          <span className="icon-container">
            <i
              className={`fa-solid fa-${isDark ? "sun" : "moon"}`}
              id="sun"
            ></i>
          </span>
          <p className="mode-name">{isDark ? "Light Mode" : "Dark Mode"}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
