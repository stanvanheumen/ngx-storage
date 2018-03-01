# `ngx-storage`
A simple library that allows you to use local storage in Angular 5+.

- Use <kbd>command</kbd> + <kbd>F</kbd> or <kbd>ctrl</kbd> + <kbd>F</kbd> to search for a keyword.
- Contributions welcome, please see [contribution guide](.github/CONTRIBUTING.md).

## Features

- :frog: **Observable based**
- :camel: **Easy implementation**
- :mouse: **Lazy loading compatible**
- :sheep: **Angular Universal compatible**
- :bird: **Ahead-Of-Time compilation compatible**

## Installation

```bash
npm install @stanvanheumen/ngx-storage --save

# or

yarn add @stanvanheumen/ngx-storage
```

## Setup

Add the `NgxStorageModule` to your imports array in your `CoreModule`. 
To receive the provider call the `forRoot()` method.

```typescript
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgxStorageModule} from '@stanvanheumen/ngx-storage';

import {AppComponent} from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    NgxStorageModule.forRoot()
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
```

## Usage

```typescript
import {Component, OnInit} from '@angular/core';
import {StorageService} from '@stanvanheumen/ngx-storage';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-root',
    template: `
        <pre>{{ data$ | async | json }}</pre>
        <button (click)="setStorage('myNewValue')">Set a new value</button>  
    `
})
export class AppComponent implements OnInit {
    
    data$: Observable<string>;
    
    constructor(private storage: StorageService) {
    }
    
    ngOnInit() {
        this.data$ = this.storage.get<string>('my-local-storage-token');
    }
    
    setStorage(value: string) {
        this.storage.set<string>('my-local-storage-token', value);
    }

}
```