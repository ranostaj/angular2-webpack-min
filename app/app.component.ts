import { Component, ViewEncapsulation } from '@angular/core';


@Component({
    selector: 'app',
    templateUrl:'./app.component.html',
    styleUrls: ['scss/style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    public url: string = '';

    constructor() {
        this.url = 'https://github.com/ranostaj/angular2-webpack-min'
    }
}
