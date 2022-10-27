import { Component, OnInit } from "@angular/core";
import { Observable, Subscription, map, shareReplay } from "rxjs";


const SHARE_REPLAY_BUFFER_SIZE = 3

@Component({
  selector: "share-replay",
  templateUrl: "./share-replay.component.html",
})
export class ShareReplayComponent implements OnInit {
  items: Array<any> = [];
  itemsSecond: Array<any> = [];

  obs: Observable<any>;
  subscription: Subscription = new Subscription();
  subscriptionSecond: Subscription = new Subscription();

  state = "initial";
  constructor() {
    let i = 0;
    this.obs = new Observable<number>((subscriber) => {
      const intervalId = setInterval(() => {
        subscriber.next(i);
        i++;
      }, 1000);

      return function unsubscribe() {
        clearInterval(intervalId);
      };
    }).pipe(
      shareReplay(SHARE_REPLAY_BUFFER_SIZE),
      map((item) => item ** 2)
    );
  }

  ngOnInit(): void {}

  subscribe(): void {
    this.state = "subscribed first";
    this.subscription = this.obs.subscribe((item) => {
      this.items.push(item);
    });
  }

  unsubscribe(): void {
    this.subscription.unsubscribe();
    this.state = "unsubscribed first";
  }

  subscribeSecond(): void {
    this.state = "subscribed second";
    this.subscriptionSecond = this.obs.subscribe((item) => {
      this.itemsSecond.push(item);
    });
  }

  unsubscribeSecond(): void {
    this.subscriptionSecond.unsubscribe();
    this.state = "unsubscribed second";
  }

  stop(): void {
    this.state = "stopped";
    this.subscriptionSecond.unsubscribe();
    this.subscription.unsubscribe();
  }

  clean(): void {
    if (this.state === "stopped") {
      this.state = "initial";
    }

    this.items = [];
    this.itemsSecond = [];
  }
}
