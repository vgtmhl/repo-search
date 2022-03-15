import { useState, useEffect, useRef } from "react";
import "./App.css";
import { useDebounce } from "./hooks/useDebounce";
import { searchRepositories } from "./api/github/repositories";
import { Card } from "./components/Card/Card";
import { results_per_page } from "./constants/constants";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [resultsNumber, setResultsNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      searchRepositories(debouncedSearchTerm, currentPage).then((results) => {
        setLoading(false);
        setResults((oldResults) => [...oldResults, ...results.items]);
        setResultsNumber(results.total_count);
      });
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [debouncedSearchTerm, currentPage]);

  function handleShowMore() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  return (
    <div className="App">
      <input
        placeholder="Search Repositories"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && <div>Loading...</div>}

      {!loading && (
        <div className="CardsContainer">
          {results?.map((repo) => (
            <Card key={repo.id} {...repo} />
          ))}
        </div>
      )}

      <div>
        {results?.length || 0} of {resultsNumber || 0}
        {results?.length > 0 && (
          <button onClick={handleShowMore}>Show more</button>
        )}
      </div>
    </div>
  );
}

export default App;
