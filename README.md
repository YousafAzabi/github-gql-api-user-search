In this app the GitHub v4 API (GraphQL API) has been implemented to search GitHub users and repositories.

## How to run the app
It is required to generate a token from GitHub to access the API and get full functionality of the app. It is still possible to test the app without a token but no results will be displayed. A Token can be generate as explained in GitHub [LINK](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token).
Token requires to be set as environment variable and named `REACT_APP_API_TOKEN`

## UI Functionality
The UI consists of:
1. TEXT FIELD: user can use it to type username or part of it.
2. BUTTON: to search for users matching username typed in text field.
3. Two LISTs: to display Users and Repositories.
4. SELECT in each list: to set the number of items in the list.
5. Two Navigation buttons in each list: displayed at the bottom to load next/previous chunk of items.

Users list is populated as soon as the app loads.
Repositories list requires to select a user from users list. Only repositories owned by the selected user are displayed.
