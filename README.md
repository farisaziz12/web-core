# Web-Core

Reusable packages to make website building faster

# Getting Started

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

# Contributing to Web-Core
Contributions are always welcome! Feel free to contribute towards any of the following:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer


## This Project uses [Github Flow](https://guides.github.com/introduction/flow/index.html), So All Code Changes Happen Through Pull Requests
Pull requests are the best way to propose changes to the codebase (we use [Github Flow](https://guides.github.com/introduction/flow/index.html)).

1. Fork the repo and create your branch from `develop`.
2. Make sure your commits follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standards.
3. If you've added code that should be tested, add tests.
4. If you've changed APIs, update the documentation.
5. Ensure the test suite passes.
6. Make sure your code lints.
7. Issue that pull request!

## Report bugs using Github's [issues](https://github.com/farisaziz12/web-core/issues)
GitHub is used issues to track bugs. Report a bug by [opening a new issue](https://github.com/farisaziz12/web-core/issues/new); it's that easy!

## Write bug reports with detail, background, and sample code:

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
- Be specific!
- Give sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)


## Use a Consistent Coding Style

* 4 spaces for indentation
* You can try running `npm run format` to get prettier to format your code.

## Note:

Remeber to run `npm run compile` so that your Typescript code is compiled into Javascript and `npm test` to check if your code passes all old and new tests before you commit.
