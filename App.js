import { Outlet } from "react-router";
import Header from "./components/Header";
import { ThemeProvider } from "./Contexts/ThemeContext";

const App = () => {
  
  return (
    <ThemeProvider>
      <Header />
      <Outlet />
    </ThemeProvider>
  );
};

export default App;
