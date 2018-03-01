import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StorageService} from './storage.service';

@NgModule({
    imports: [CommonModule]
})
export class NgxStorageModule {

    static forRoot() {
        return {
            ngModule: NgxStorageModule,
            providers: [
                StorageService
            ]
        };
    }

}
