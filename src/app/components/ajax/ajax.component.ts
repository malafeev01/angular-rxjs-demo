import { Component } from "@angular/core";
import { catchError, Observable, tap, of } from "rxjs";
import { ajax, AjaxResponse } from "rxjs/ajax";

@Component({
  selector: "app-ajax",
  templateUrl: "./ajax.component.html",
})
export class AjaxComponent {
  requestJson: Observable<AjaxResponse<unknown>>;
  requestError: Observable<AjaxResponse<unknown>>;
  result = "";

  constructor() {
    this.requestJson = ajax("https://httpbin.org/stream/1");
    this.requestError = ajax("https://httpbin.org/status/500").pipe(
      catchError((error) => {
        return of(error.message);
      })
    );
  }

  getJson(): void {
    const subscription = this.requestJson.subscribe({
      next: (value) => {
        this.result = JSON.stringify(value.response);
        subscription.unsubscribe();
      },
      error: (err) => (this.result = JSON.stringify(err))
    });
  }

  getError(): void {
    const subscription = this.requestError.subscribe({
      next: (value) => {
        this.result = JSON.stringify(value);
        subscription.unsubscribe();
      },
      error: (err) => (this.result = err),
    });
  }
}
