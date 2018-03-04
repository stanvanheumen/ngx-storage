import {StorageService} from '../../library/src/storage.service';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    currentLanguage$: Observable<string>;
    authenticationToken$: Observable<string>;

    constructor(private storage: StorageService) {
    }

    ngOnInit() {
        this.currentLanguage$ = this.storage.get<string>('my-current-language');
        this.authenticationToken$ = this.storage.get<string>('my-authentication-token');
    }

    setStorageValue(token: string, value: string) {
        this.storage.set<string>(token, value);
    }

    clearStorageValue(token: string) {
        this.storage.clear(token);
    }

    clearAll() {
        this.storage.clearAll();
    }

}
