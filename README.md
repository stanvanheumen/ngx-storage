# `ngx-storage`
A simple library that allows you to use local storage in Angular 5+.

- Use <kbd>command</kbd> + <kbd>F</kbd> or <kbd>ctrl</kbd> + <kbd>F</kbd> to search for a keyword.
- Contributions welcome, please see [contribution guide](.github/CONTRIBUTING.md).

## Features

- :frog: **Observable based**
- :camel: **Easy implementation**
- :panda_face: **Automatic JSON parsing**
- :mouse: **Lazy loading compatible**
- :sheep: **Angular Universal compatible**
- :bird: **Ahead-Of-Time compilation compatible**
- :hamster: **Library can be consumed by Angular CLI, Webpack, or SystemJS**

## Installation

```bash
npm install @stanvanheumen/ngx-storage --save

# or

yarn add @stanvanheumen/ngx-storage
```

## Setup

Add the `NgxStorageModule` to your imports array in your `CoreModule`. To get a singleton of the `StorageService`, call 
the `forRoot()` method.

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
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## Usage

There are four methods in this library:

### Get

When you call this method you receive an RxJS Observable that will get updated once the user sets a new value to the 
same token via the `set<T>()` method. This method supports automatic JSON parsing.

```typescript
this.storage.get<T>('my-local-storage-token'); // Returns an observable of type T.
```

### Set

When you call this method the subscriptions on the `get<T>()` observable will automatically get notified.
This method supports the automatic JSON stringify.

```typescript
this.storage.set<T>('my-local-storage-token', 'my-new-value'); // The second argument is of type T.
```

### Clear

When you call this method the subscriptions on the `get<T>()` observable will automatically get set to null. 
And the local storage will be cleared.

```typescript
this.storage.clear('my-local-storage-token');
```

### Clear all

When you call this method the subscriptions on the `get<T>()` observable will automatically get set to null. 
And the local storage will be completely cleared.

```typescript
this.storage.clearAll();
```

## Example

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