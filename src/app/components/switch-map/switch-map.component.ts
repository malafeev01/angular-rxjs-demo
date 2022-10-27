import { Component } from '@angular/core';
import { map, Observable, of, Subscription, switchMap } from 'rxjs';


function customOperator (multiplicator: number) {
  return map( ( value: number ) => value * multiplicator)
  
}

@Component({
  selector: 'switch-map',
  templateUrl: './switch-map.component.html',
})
export class SwitchMapComponent {
  obs: Observable<number>;
  subscription: Subscription = new Subscription();
  data: Array<number> = [];

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
      switchMap( x => of(x, x + 1, x + 3)),
      customOperator(10)
    );
  }

  subscribe(): void {
    this.subscription = this.obs.subscribe((item) => {
      this.data.push(item);
    });
  }

  unsubscribe(): void {
    this.subscription.unsubscribe();
  }
}
