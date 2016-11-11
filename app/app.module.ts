import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'

// Modules
import {AppRoutingModule} from "./app.routing.module";
import {AboutModule} from "./aboutComponent/about.module";
import {HomeModule} from "./homeComponent/home.module";


@NgModule({
    imports:[ BrowserModule, AppRoutingModule, HomeModule, AboutModule],
    declarations:[AppComponent],
    bootstrap: [AppComponent]
})

export class AppModule { }

