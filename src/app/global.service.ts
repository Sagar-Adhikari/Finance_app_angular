import { AppState } from './state/app.state';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
interface ILayout {
  pageTitle: string,
  allowFooter: boolean
}

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  private pageTitleSource = new Subject<ILayout>();
  private _loading = false;
  private loadingSource = new BehaviorSubject<boolean>(false);
  pageTitle$ = this.pageTitleSource.asObservable();
  loading$ = this.loadingSource.asObservable();

  loading : boolean = true;

  constructor(private snackbar: MatSnackBar,private store:Store<AppState>) { }


  YYYYMMDD = (date: Date) => {
    var x = new Date(date);
    var y = x.getFullYear().toString();
    var m = (x.getMonth() + 1).toString();
    var d = x.getDate().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    var yyyymmdd = y + '-' + m + '-' + d;
    return yyyymmdd;

  }

  setLayout(layout: ILayout) {
    setTimeout(() => {
      this.pageTitleSource.next(layout);
    });
  }

  setLoading(loading: boolean) {
    if (this._loading === loading) { return; }
    this._loading = loading;
    setTimeout(() => {
      this.loadingSource.next(loading);
    }, 0);
  }

  showMessageSuccess(message: string, duration?: number) {
    this.snackbar.open(message, null,
      { duration: duration ? duration : 3000, panelClass: ['success-snackbar'] });
    this._loading = false;
    this.loadingSource.next(this._loading);
  }

  showMessageError(message: string, duration?: number) {
    this.snackbar.open(message, 'Error:',
      { duration: duration ? duration : 3000, panelClass: ['error-snackbar'] });
    this._loading = false;
    this.loadingSource.next(this._loading);
  }

  showMessageInfo(message: string, duration?: number) {
    this.snackbar.open(message, null,
      { duration: duration ? duration : 3000, panelClass: ['info-snackbar'] });
    this._loading = false;
    this.loadingSource.next(this._loading);
  }

  showMessageWarning(message: string, duration?: number) {
    this.snackbar.open(message, null,
      { duration: duration ? duration : 3000, panelClass: ['info-snackbar'] });
    this._loading = false;
    this.loadingSource.next(this._loading);
  }


  printDocument(css) {
    let printContents, popupWin;
    printContents = document.getElementById("printLayout").innerHTML;
    var a = css;
    popupWin = window.open("", "_blank", "top=0,left=0,height=100%,width=auto");
    popupWin.document.write(`
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>AdminApp</title>
      <base href="/">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link  rel="stylesheet">
      <link rel="icon" type="image/x-icon" href="favicon.ico">
      <style>
        app-root { display:none; }
        ${css}
      </style>
    </head>
    <body class="mat-typography">
    <app-root></app-root>
    ${printContents}
    <script src="runtime.js" type="module"></script><script src="polyfills.js" type="module"></script><script src="styles.js" type="module"></script><script src="vendor.js" type="module"></script><script src="main.js" type="module"></script></body>
    </html>
    `);
    popupWin.document.close();
  }

}
