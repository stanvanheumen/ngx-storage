import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {_throw} from 'rxjs/observable/throw';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {of} from 'rxjs/observable/of';

interface StorageState {
    [key: string]: BehaviorSubject<any>;
}

@Injectable()
export class StorageService {

    // The localStorage (only available in the browser).
    private readonly storage = (typeof window !== 'undefined') ? window.localStorage : null;

    // The state containing the observables.
    private state: StorageState = {};

    get<T = any>(key: string): Observable<T | null> {
        // Check if the storage exists.
        if (!this.storage) {
            return of(null);
        }

        // Check if the storage is already in the state; if so, return the subject.
        if (this.state[key]) {
            return this.state[key];
        }

        // Get the data from the local storage.
        const rawData = this.storage.getItem(key);

        // Try to parse the data.
        let parsedData: T | null = null;

        // Only parse the data when it is not null.
        if (rawData !== null) {
            try {
                parsedData = JSON.parse(rawData);
            } catch (error) {
                return _throw(
                    new Error('The raw data cannot be parsed; Invalid data in local storage.')
                );
            }
        }

        // Add the parsed data to the state as an observable.
        this.state[key] = new BehaviorSubject<T>(parsedData);

        // Return the observable.
        return this.state[key];
    }

    set<T = any>(key: string, data: T) {
        // Check if the storage exists.
        if (!this.storage) {
            return;
        }

        // Stringify the data.
        const rawData = JSON.stringify(data);

        // Set the item in the storage.
        this.storage.setItem(key, rawData);

        // Check if the storage does not exist.
        if (!this.state[key]) {
            return;
        }

        // Push the new data.
        this.state[key].next(data);
    }

    clear(key: string) {
        // Check if the storage exists.
        if (!this.storage) {
            return;
        }

        // Remove the item from the storage.
        this.storage.removeItem(key);

        // Check if the storage state exists.
        if (!this.state[key]) {
            return;
        }

        // Set the state to null.
        this.state[key].next(null);
    }

    clearAll() {
        // Check if the storage exists.
        if (!this.storage) {
            return;
        }

        // Do a local storage clear.
        this.storage.clear();

        // Set all states to null.
        Object.keys(this.state)
            .forEach(key => this.state[key].next(null));
    }

}
