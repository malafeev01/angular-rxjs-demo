import { compileClassMetadata } from "@angular/compiler";
import { Component } from "@angular/core";
import { asyncScheduler, Observable, observeOn } from "rxjs";

@Component({
  selector: "app-scheduler",
  templateUrl: "./scheduler.component.html",
})
export class SchedulerComponent {
  obs: Observable<number>;
  schduler: Observable<number>;
  
  data: Array<any> = [];

  constructor() {
    this.obs = new Observable<number>((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.complete();
    });


    this.schduler = new Observable<number>((subscriber) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.complete();
    }).pipe(observeOn(asyncScheduler));
  }

  subscribe() {
    this.data = [];
    this.data.push("before subscribe");
    this.obs.subscribe({
      next: (value) => {
        this.data.push(value);
      },
      complete: () => {
        this.data.push("complete");
      },
    });
    this.data.push("after subscribe");
  }

  subscribeScheduler() {
    this.data = [];
    this.data.push("before subscribe");
    this.schduler.subscribe({
      next: (value) => {
        this.data.push(value);
      },
      complete: () => {
        this.data.push("complete");
      },
    });
    this.data.push("after subscribe");
  }
}
