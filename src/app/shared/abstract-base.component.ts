import {Injectable, OnDestroy} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export abstract class AbstractBaseComponent implements OnDestroy {
    protected unsubscribe$ = new Subject();

    abstract onDestroy(): void;

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();

        this.onDestroy();
    }

    obs(obs: Observable<any>): Observable<any> {
        return obs.pipe(takeUntil(this.unsubscribe$));
    }
}
