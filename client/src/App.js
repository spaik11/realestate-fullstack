import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Spinner from "./components/Spinner/Spinner";
import MainRouter from "./MainRouter";

function App() {
  return (
    <Router>
      <React.Suspense fallback={<Spinner />}>
        <MainRouter />
      </React.Suspense>
    </Router>
  );
}

export default App;
