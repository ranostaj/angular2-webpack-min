
import {NgModule} from "@angular/core";
import {AboutComponent} from "./about.component";
import {AboutService} from "./about.service";


@NgModule({
   declarations: [AboutComponent],
   providers: [AboutService],
   exports: [AboutComponent]
})

export class AboutModule { }