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
- :panda_face: **Automatic JSON (de)serialization**
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

Add the `NgxStorageModule` to your imports array in your `CoreModule`.

```typescript
import {NgxStorageModule} from '@stanvanheumen/ngx-storage';

@NgModule({
    imports: [NgxStorageModule.forRoot()]
})
export class AppModule {}
```

> The `forRoot()` method should only be called in your `CoreModule` since it provides the `StorageService`.

## API

The `StorageService` has the following API:

#### `.get<T>(token: string): Observable<T | null>`

Returns the value associated to the specified token wrapped in an observable stream that will get updated each time the 
user sets a new value in the storage.

```typescript
// For a primitive type like string, number and boolean.
const string$ = this.storage.get<string>('my-string');

// For an advanced object or array.
const object$ = this.storage.get<MyAdvancedObject>('my-advanced-object');
```

> The value is deserialized using the `JSON.parse()` method.

#### `.set<T>(token: string, data: T): void`

Associates a value to the specified token. 

```typescript
// For a primitive type like string, number and boolean.
this.storage.set<string>('my-local-storage-token', 'my-new-value');

// For an advanced object or array.
this.storage.set<MyAdvancedObject>({name: 'Test', description: 'Lorem Ipsum'});
```

> The value is serialized using the `JSON.stringify()` method.

#### `.remove(token: string): void`

Removes the value associated to the specified token.

```typescript
this.storage.remove('my-local-storage-token');
```

#### `.clear(): void`

Removes all key-value pairs from the storage.

```typescript
this.storage.clear();
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
        <button (click)="removeStorageValue()">Clear the value</button>
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
    
    removeStorageValue() {
        this.storage.remove('my-local-storage-token');
    }

}
```