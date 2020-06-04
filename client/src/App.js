import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "./components/Context/UserContext";
import Spinner from "./components/Spinner/Spinner";
import MainRouter from "./MainRouter";

function App() {
  return (
    <Provider>
      <Router>
        <React.Suspense fallback={<Spinner />}>
          <MainRouter />
        </React.Suspense>
      </Router>
    </Provider>
  );
}

export default App;
