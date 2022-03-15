import { results_per_page } from "../../constants/constants";

const repo_search_endpoint = "https://api.github.com/search/repositories?q=";
const paging_param = "&per_page=";
const current_page_param = "&page=";

export function searchRepositories(searchTerm, currentPage) {
  const searchQuery =
    repo_search_endpoint +
    searchTerm +
    paging_param +
    results_per_page +
    current_page_param +
    currentPage;

  return fetch(searchQuery)
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => {
      console.error(error);
      return [];
    });
}
