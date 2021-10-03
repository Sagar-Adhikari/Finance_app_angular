// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  siteUrl: 'http://localhost:4200',
  siteName: 'pW Admin',
  baseAuthUrl: 'http://localhost:44375',
  roleManagerApiUrl: 'http://localhost:5002/api',
  reportingApiUrl: 'http://localhost:5003/api',


  authority: 'http://localhost:44375',
  client_id: 'ng_client',
  redirect_uri: 'http://localhost:4200',
  response_type: 'code',
  scope: 'openid profile RoleManager.API Reporting.API'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
