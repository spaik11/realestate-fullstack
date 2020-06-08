import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "./components/Context/UserContext";
import { CityProvider } from "./components/Context/CityContext";
import Spinner from "./components/Spinner/Spinner";
import MainRouter from "./MainRouter";

function App() {
  return (
    <Provider>
      <CityProvider>
        <Router>
          <React.Suspense fallback={<Spinner />}>
            <MainRouter />
          </React.Suspense>
        </Router>
      </CityProvider>
    </Provider>
  );
}

export default App;
