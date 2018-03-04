import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {_throw} from 'rxjs/observable/throw';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

interface StorageState {
    [key: string]: BehaviorSubject<any>;
}

@Injectable()
export class StorageService {

    // The localStorage (only available in the browser).
    private readonly storage = (typeof window !== 'undefined' && window.hasOwnProperty('localStorage'))
        ? window.localStorage
        : null;

    // The state containing the observables.
    private state: StorageState = {};

    constructor() {
        // Warn the user once if the local storage is not supported.
        if (!this.storage) {
            this.warn('The local storage is not available on this platform.');
        }
    }

    get<T = any>(key: string): Observable<T | null> {
        // Check if the storage is already in the state; if so, return the subject.
        if (this.state[key]) {
            return this.state[key];
        }

        // Get the data from the local storage.
        let rawData = null;
        if (this.storage) {
            rawData = this.storage.getItem(key);
        }

        // Try to parse the data.
        let parsedData: T | null = null;

        // Only parse the data when it is not null.
        if (rawData !== null) {
            try {
                parsedData = JSON.parse(rawData);
            } catch (error) {
                return _throw(
                    new Error('The raw data cannot be parsed; Invalid data in the storage.')
                );
            }
        }

        // Add the parsed data to the state as an observable.
        this.state[key] = new BehaviorSubject<T>(parsedData);

        // Return the observable.
        return this.state[key];
    }

    set<T = any>(key: string, data: T) {
        // Stringify the data.
        const rawData = JSON.stringify(data);

        // Set the item in the storage.
        if (this.storage) {
            this.storage.setItem(key, rawData);
        }

        // Check if the state does not exist.
        if (!this.state[key]) {
            return;
        }

        // Check if the current and next values are not equal.
        const current = this.state[key].getValue();
        if (current === data) {
            return;
        }


        // Push the new data.
        this.state[key].next(data);
    }

    clear(key: string) {
        // Remove the item from the storage (if the storage exists).
        if (this.storage) {
            this.storage.removeItem(key);
        }

        // Check if the storage state exists.
        if (!this.state[key]) {
            return;
        }

        // Check if the current and next values are not equal.
        const current = this.state[key].getValue();
        const next = null;
        if (current === next) {
            return;
        }

        // Set the state to null.
        this.state[key].next(next);
    }

    clearAll() {
        // Do a local storage clear (if the storage exists).
        if (this.storage) {
            this.storage.clear();
        }

        // Set all states to null.
        Object.keys(this.state).forEach(key => {
            // Check if the current and next values are not equal.
            const current = this.state[key].getValue();
            const next = null;
            if (current === next) {
                return;
            }

            // Only emit if the values are not equal.
            this.state[key].next(next);
        });
    }

    private warn(text: string) {
        if (console && console.warn) {
            console.warn(text);
        }
    }

}
