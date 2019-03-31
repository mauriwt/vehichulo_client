// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  oauth:{
    remote: "http://alfa-yauth.yachay.gob.ec",
    local: "http://localhost:8080"
  },
  APIRest: {
    url: "http://localhost:8080",
    //urlYcore: "http://172.18.0.11:8080/ycore"
  }, 
  firebaseConfig: {
    apiKey: "AIzaSyBCKvoWCg8rRKOmNQbsc_EZKueGXjycAKg",
    authDomain: "react-callary.firebaseapp.com",
    databaseURL: "https://react-callary.firebaseio.com",
    projectId: "react-callary",
    storageBucket: "react-callary.appspot.com",
    messagingSenderId: "1031141703508"
  }
};
