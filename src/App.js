import { useState, useEffect } from "react";
import "./App.css";
import { useDebounce } from "./hooks/useDebounce";
import { searchRepositories } from "./api/github/repositories";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      searchRepositories(debouncedSearchTerm, 1).then((results) => {
        //TODO: add page number
        setLoading(false);
        setResults(results);
      });
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [debouncedSearchTerm]);

  // TODO: remove, only for displaying results for development
  useEffect(() => {
    console.log(results);
  }, [results]);

  return (
    <div className="App">
      <input
        placeholder="Search Repositories"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && "Loading..."}
    </div>
  );
}

export default App;
