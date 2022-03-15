import { useState, useEffect, useRef } from "react";
import "./App.css";
import { useDebounce } from "./hooks/useDebounce";
import { searchRepositories } from "./api/github/repositories";
import { Card } from "./components/Card/Card";

function App() {
  const searchStarted = useRef(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [resultsNumber, setResultsNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    setLoading(true);
    setResults([]);
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      searchRepositories(debouncedSearchTerm, currentPage).then((results) => {
        setLoading(false);
        setResults((oldResults) => [...oldResults, ...results?.items]);
        setResultsNumber(results.total_count);
        searchStarted.current = true;
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

      {!loading &&
        searchStarted.current &&
        searchTerm.length > 0 &&
        results?.length === 0 && <div>No entries:(</div>}

      {!loading && results?.length > 0 && (
        <>
          <div className="CardsContainer">
            {results?.map((repo) => (
              <Card key={repo.id} {...repo} />
            ))}
          </div>

          <div>
            {results?.length} of {resultsNumber || 0}
            <button onClick={handleShowMore}>Show more</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
