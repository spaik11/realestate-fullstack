import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "./components/Context/UserContext";
import { CityProvider } from "./components/Context/CityContext";
import { FavoritesProvider } from "./components/Context/FavoritesContext";
import Spinner from "./components/Spinner/Spinner";
import MainRouter from "./MainRouter";

function App() {
  return (
    <Provider>
      <CityProvider>
        <FavoritesProvider>
          <Router>
            <React.Suspense fallback={<Spinner />}>
              <MainRouter />
            </React.Suspense>
          </Router>
        </FavoritesProvider>
      </CityProvider>
    </Provider>
  );
}

export default App;
