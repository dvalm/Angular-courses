import { BehaviorSubject } from 'rxjs';

export class RouterStub {
    public navigateByUrl = jasmine.createSpy('navigate');
    public events: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    constructor() {}
}
