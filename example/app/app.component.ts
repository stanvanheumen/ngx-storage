import {StorageService} from '../../library/src/storage.service';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    data$: Observable<string>;

    constructor(private storage: StorageService) {
    }

    ngOnInit() {
        this.data$ = this.storage.get<string>('my-local-storage-token');
    }

    setStorageValue(value: string) {
        this.storage.set<string>('my-local-storage-token', value);
    }

    clearStorageValue() {
        this.storage.clear('my-local-storage-token');
    }

}
