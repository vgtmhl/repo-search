# Github repository search

During a tech interview, I was asked to code this application in React in 2 hours.

I completely screwed up :) so let's give this another go

## Assignment

Realize a repository search app with:

- a search bar that accepts a string, which is used to make a (debounced) call to the gitbhub repositories api.

- one card per result, shown in waves of 10 cards. The card should contain:

  - the logo of the repo's owner
  - repo's title
  - repo's description
  - number of stars

- A display of the current repo number (e.g. "Now displaying repo 5 of 100")

- A "show more" button, that loads the next page of results

## Notes

- Error and Loading states should be handled and shown in the UI
- The search should be debounced (github api is rate limited)
