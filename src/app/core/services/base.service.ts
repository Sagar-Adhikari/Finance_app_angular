import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    private http: HttpClient,
    private oidcSecurityService: OidcSecurityService,
  ) { }

  get(

    requestUrl: string,
    queryParams: any
  ) {
    var authHeader = this.oidcSecurityService.getToken();
    return this.http.get(requestUrl, {
      headers: { 'Authorization': 'Bearer ' + authHeader },
      params: queryParams
    });
  }

  post(
    requestUrl: string,
    queryParams: any,
    body: any,
    observeResponse?: boolean,
  ) {
    var httpOptions: any = {}
    var authHeader = this.oidcSecurityService.getToken();

    if (observeResponse) {
      httpOptions.observe = 'response';
    }

    if (queryParams != null) {
      httpOptions.params = queryParams;
    }

    var resp = this.http.post(requestUrl, body, {
      headers: {
        'Authorization': 'Bearer ' + authHeader
      },
      // observe: 'response',
      params: queryParams
    });

    return resp;
  }

}
