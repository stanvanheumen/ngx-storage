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

## Demo

[Click here to play with the example](https://stackblitz.com/github/stanvanheumen/ngx-storage)

## Installation

To use ngx-storage in your project install it via `npm` or `yarn`:

```bash
$ npm install @stanvanheumen/ngx-storage --save

# or

$ yarn add @stanvanheumen/ngx-storage
```

## Setup

Add the `NgxStorageModule` to your imports array in your `Root Module`.

When you forget to call the `forRoot()` method you will NOT receive the `StorageService` provider.

```typescript
import {NgxStorageModule} from '@stanvanheumen/ngx-storage';

@NgModule({
    imports: [
        NgxStorageModule.forRoot()
    ]
})
export class AppModule {}
```

## Usage

### Get

When you call this method you receive an `Observable` that will get updated each time the user sets a new value 
via the `set<T>()` method. This method supports automatic JSON parsing.

```typescript
this.storage.get<T>('my-local-storage-token').subscribe(result => {
    // Returns an object or primitive of type T.
    // This will get triggered every time a change is made in the local storage.
});
```

### Set

When you call this method the subscriptions on the `get<T>()` observable will automatically get notified.
This method supports the automatic JSON stringify.

```typescript
this.storage.set<T>('my-local-storage-token', 'my-new-value'); // The second argument is of type T.
```

### Clear

When you call this method the subscriptions on the `get<T>()` observable will automatically get set to null. 
And the local storage will be cleared of the provided key.

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
        <pre><code>Current value in the local storage : {{ data$ | async | json }}</code></pre>
        
        <button (click)="setStorageValue('Awesome')">Set value to <strong>"Awesome"</strong></button>
        <button (click)="setStorageValue('Cool')">Set value to <strong>"Cool"</strong></button>
        <button (click)="setStorageValue('Hello world!')">Set value to <strong>"Hello world!"</strong></button>
        <button (click)="clearStorageValue()">Clear the value</button>
    `
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
```