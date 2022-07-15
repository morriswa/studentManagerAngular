// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api : "http://localhost:8080/",
  auth : {
    "domain" : "dev-9deub659.us.auth0.com",
    "clientId" : "73UVkM0NOBhxYZOPgntG2Eu0wB6WOA08",
    "audience" : "http://localhost:8080/api/v2/",
  }
};

