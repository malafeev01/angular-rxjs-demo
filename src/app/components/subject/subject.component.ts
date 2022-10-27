import { Component } from "@angular/core";
import { Observable, Subscription, Subject } from "rxjs";

@Component({
  selector: "app-subject",
  templateUrl: "./subject.component.html",
})
export class SubjectComponent {
  obs: Observable<number>;
  subscription1: Subscription = new Subscription();
  subscription2: Subscription = new Subscription();
  data1: Array<number> = [];
  data2: Array<number> = [];
  subject = new Subject<number>();

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
    });

    this.obs.subscribe(this.subject);
  }

  subscribe(): void {
    this.subscription1 = this.subject.subscribe((item) => {
      this.data1.push(item);
    });
    this.subscription2 = this.subject.subscribe((item) => {
      this.data2.push(item);
    });
  }

  unsubscribe(): void {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
  }
}
