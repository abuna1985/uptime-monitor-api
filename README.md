# Uptime Monitor API

## User Stories

- [ ] 1. The API listens on a PORT and accepts incoming HTTP requests for POST, GET, PUT, DELETE and HEAD.

- [ ] 2. The API allows a client to connect, then create a new user, then edit and delete that user.

- [ ] 3. The API Allows a user to "sign in" which gives them a token that they can use for subsequent authenticated requests.

- [ ] 4. The API allows the user to "sign out" which invalidated their token.

- [ ] 5. The API allows a signed-in user to use their token to create a new "check".

- [ ] 6. The API allos a signed-in user to edit/delete their checks and limit the user to 5 checks.

- [ ] 7. In the background, workers perform all the "checks" at the appropriate times, and send alerts to the users when a check changes its state from "up" to "down", or vice versa.
