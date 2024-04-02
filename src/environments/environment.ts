// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://absopickup-dev.ap-south-1.elasticbeanstalk.com/',
  rootPathUrl: 'http://absopickup-dev.ap-south-1.elasticbeanstalk.com/',

  firebase: {
    apiKey: 'AIzaSyDLYLj-PCBtHVjbjbboUwp6FaVdCN_-jIw',
    authDomain: 't21-solution.firebaseapp.com',
    projectId: 't21-solution',
    storageBucket: 't21-solution.appspot.com',
    messagingSenderId: '684233082724',
    appId: '1:684233082724:web:1fabb0af151b1d7dd51c71',
    measurementId: 'G-YEKVG62JMZ',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
