In this app the GitHub v4 API (GraphQL API) has been implemented to search GitHub users and repositories.

## How to run the app
It is required to generate a token from GitHub to access the API and get full functionality of the app. It still possible to test the app without a token but no results will be displayed. Token can be generate as explained in GitHub [LINK](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token).
Token requires to be set as environment variable and named `REACT_APP_API_TOKEN`

## UI Functionality
The UI consists of:
1. Text field: user can use it to type username or part of it.
2. Button: to search for users matching username typed in text field.
3. Two lists: to display Users and Repositories.
4. Select in each list: to set the number of items in the list.
5. Navigation buttons: each list has two navigation buttons at the bottom to load next/previous chunk.

Users list is populated as soon as the app loads.
Repositories list requires to select a user from users list. Only repositories owned by selected user are displayed.