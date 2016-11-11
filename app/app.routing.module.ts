import { NgModule } from '@angular/core'
import {RouterModule, Routes} from '@angular/router'

import {AboutRoutes} from "./aboutComponent/about.routes";
import {HomeRoutes} from "./homeComponent/home.routes";


const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    ...AboutRoutes,
    ...HomeRoutes
];


@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})

export class AppRoutingModule {}
