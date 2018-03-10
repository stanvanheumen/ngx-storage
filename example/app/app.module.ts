import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {NgxStorageModule} from '../../library/src/storage.module';

import {AppComponent} from './app.component';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        NgxStorageModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
