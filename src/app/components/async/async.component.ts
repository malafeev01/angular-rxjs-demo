import { Component } from "@angular/core";
import { map, Observable, of, Subscription, switchMap } from "rxjs";

@Component({
  selector: "app-async",
  templateUrl: "./async.component.html",
})
export class AsyncComponent {
  stopFlag = false;
  obs: Observable<number>;
  subscription: Subscription = new Subscription();
  data: Array<number> = [];
  
  data_of = of({test: 1, test1: 2}).pipe(map(x => x['test1']));

  constructor() {
    let i = 0;
    this.obs = new Observable<number>((subscriber) => {
      const intervalId = setInterval(() => {
        if (!this.stopFlag) {
          subscriber.next(i);
          i++;
        }
      }, 1000);

      return function unsubscribe() {
        clearInterval(intervalId);
      };
    });
  }

  resume(): void {
    this.stopFlag = false;
  }

  stop(): void {
    this.stopFlag = true;
  }
}
