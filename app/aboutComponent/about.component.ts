import {Component, OnInit} from '@angular/core'
import {AboutService} from "./about.service";

@Component({
    templateUrl: './about.template.html',
    styleUrls:['./about.scss']
})

export class AboutComponent implements OnInit {
    public title: string;

    constructor(private aboutService: AboutService) {}


    ngOnInit(): void {
        this.aboutService.getSomeData()
            .then(result => this.title = result)
    }
}