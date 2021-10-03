// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  siteUrl: 'http://103.198.8.149:4200',
  siteName: 'pW Admin',
  baseAuthUrl: 'http://103.198.8.149:44375',
  roleManagerApiUrl: 'http://103.198.8.149:5002/api',
  reportingApiUrl: 'http://103.198.8.149:5003/api',

  authority: 'http://103.198.8.149:44375',
  client_id: 'ng_client',
  redirect_uri: 'http://103.198.8.149:4200',
  response_type: 'code',
  scope: 'openid profile RoleManager.API Reporting.API'
};
