import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class DataService {

    private dataSource = new BehaviorSubject({});
    userData = this.dataSource.asObservable();

    constructor() { }

    setUserData(data: object) {
        this.dataSource.next(data)
    }

}