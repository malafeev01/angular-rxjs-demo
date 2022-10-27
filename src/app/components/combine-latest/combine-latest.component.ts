import { Component } from "@angular/core";
import {
  Observable,
  Subscription,
  combineLatest,
  interval,
  tap,
} from "rxjs";

@Component({
  selector: "combine-latest",
  templateUrl: "./combine-latest.component.html",
})
export class CombineLatestComponent {
  itemsLatest: Array<any> = [];
  state = "initial";
  combineLatestObs: Observable<any>;
  subscriptionLatest: Subscription = new Subscription();

  constructor() {
    this.combineLatestObs = combineLatest([
      interval(1000),
      interval(2000),
    ]).pipe(
      tap((item) => {
        console.log(item);
      })
    );
  }

  subscribeLatest(): void {
    this.subscriptionLatest = this.combineLatestObs.subscribe((item) => {
      this.itemsLatest.push(item);
    });
  }

  unsubscribeLatest(): void {
    this.subscriptionLatest.unsubscribe();
  }
}
