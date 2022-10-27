import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShareReplayComponent } from './components/share-replay/share-replay.component';
import { CombineLatestComponent } from './components/combine-latest/combine-latest.component';
import { AjaxComponent } from './components/ajax/ajax.component';
import { SwitchMapComponent } from './components/switch-map/switch-map.component';
import { AsyncComponent } from './components/async/async.component';
import { SubjectComponent } from './components/subject/subject.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { GenericsComponent } from './components/generics/generics.component';

@NgModule({
  declarations: [
    AppComponent,
    ShareReplayComponent,
    CombineLatestComponent,
    AjaxComponent,
    SwitchMapComponent,
    AsyncComponent,
    SubjectComponent,
    SchedulerComponent,
    GenericsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
