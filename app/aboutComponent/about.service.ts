

import {Injectable} from "@angular/core";

@Injectable()
export class AboutService {

    getSomeData(): Promise<string> {
        return  Promise.resolve('Wellcome');
    }
}