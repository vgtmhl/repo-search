import { useState, useEffect, useRef } from "react";
import "./App.css";
import { useDebounce } from "./hooks/useDebounce";
import { searchRepositories } from "./api/github/repositories";
import { Card } from "./components/Card/Card";
import { results_per_page } from "./constants/constants";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const currentPage = useRef(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      searchRepositories(debouncedSearchTerm, currentPage.current).then(
        (results) => {
          //TODO: add page number
          setLoading(false);
          setResults(results);
        }
      );
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

      {loading && <div>Loading...</div>}

      {!loading && (
        <div className="CardsContainer">
          {results?.items?.map((repo) => (
            <Card {...repo} />
          ))}
        </div>
      )}

      {results.length > 0 && (
        <div>
          ${currentPage * results_per_page} of ${results.total_count}
        </div>
      )}
    </div>
  );
}

export default App;
