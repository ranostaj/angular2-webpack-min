import { Component } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl:'./app.component.html',
    styleUrls: ['./style.scss']
})
export class AppComponent {
    public url: string = '';

    constructor() {
        this.url = 'https://github.com/ranostaj/angular2-webpack-min'
    }
}
