# Web-Core

Reusable packages to make website building faster

## Packages
  ### Auth Package `@farisaziz12/web-core/packages/auth/src`
  
  The **Auth** package is used for all authentication needs using firebase
  
```javascript
    const { Auth } = require("@farisaziz12/web-core/packages/auth/src");
 
    const config = {
      apiKey: "firebaseApiKey",
    };
    
    /*
    For Authentication to work the Auth class instance needs to 
    receive a config object with your firebase api key to be initialized 
    */
    
    const auth = new Auth(config);
    // The auth.login method returns a promise with the firebase user data
    auth
    .login(email, password)
    .then((userData) => console.log(userData));
```
