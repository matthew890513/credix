import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    private _loading$ = new BehaviorSubject<boolean>(false)

    constructor(){}
    
    get loading$(): Observable<boolean>{
        return this._loading$.asObservable();
    }

    setLoadingState(isLoading: boolean): void{
        this._loading$.next(isLoading);
    }
    
}