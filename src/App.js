import React from "react";
import { getRepos } from "./api/github/repositories";
import "./App.css";

function App() {
  React.useEffect(() => {
    getRepos("sonar", 1);
  }, []);
  return <div className="App">something</div>;
}

export default App;
