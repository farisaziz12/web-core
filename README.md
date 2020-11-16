# Web-Core

Reusable packages to make website building faster

## Getting Started

#### Step 1:

Create a `.npmrc` file in the same directory as your `package.json` file and add this inside:

```
// .npmrc
registry=https://npm.pkg.github.com/farisaziz12
```

#### Step 2:

run `npm install @farisaziz12/web-core`

## Packages

### Auth Package `@farisaziz12/web-core/packages/auth/src`

The **Auth** package is used for all authentication needs using [firebase](https://firebase.google.com/docs/web/setup)

```javascript
const { Auth } = require("@farisaziz12/web-core/packages/auth/src");

// Config object for firebase initialization
const config = {
    apiKey: "firebaseApiKey",
};

/*
  For Authentication to work the Auth class instance needs to 
  receive a config object with your firebase api key
*/

const auth = new Auth(config);

// LOGIN
auth.login(email, password)
    .then((userData) => console.log(userData))
    .catch((error) => console.error(error));

// The auth.login method returns a promise with the firebase user data

// SIGN UP
auth.signUp(email, password, passwordConfirmation)
    .then((userData) => console.log(userData))
    .catch((error) => console.error(error));

/* The auth.signUp method returns a promise with the user data
  and sends a confirmation email using firebase
  if the password and password confirmation match
*/

// SIGN UP ERROR EXAMPLE
auth.signUp("user@test.com", "password", "pswrd")
    .then((userData) => console.log(userData))
    .catch((error) => console.error(error)); // => Error: Passwords do not match

/* If no password confirmation is provided or the passwords do not match
  an error is thrown and the user is not signed up
*/

// SIGN OUT
auth.signOut()
    .then((response) => console.log(response)) // response => { success: true }
    .catch((error) => console.error(error));

/* On successful firebase sign out the auth.signOut method returns a promise which
  resolves to a success object
*/

// GET CURRENT USER
auth.getCurrentUser()
    .then((currentUser) => console.log(currentUser)) // response => { email: "xxx@xxx.com", ... }
    .catch((error) => console.error(error));

/* If a user is currently logged in the auth.getCurrentUser method will return
  an object with the current user's data
*/
```
