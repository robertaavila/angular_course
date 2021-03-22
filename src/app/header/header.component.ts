import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})

export class HeaderComponent implements OnInit{
    collapsed = true;
    private userSubscription: Subscription;
    isAuthenticated = false;

    constructor(private dataStorageService: DataStorageService,
                private authService: AuthService 
                ) {}

    ngOnInit() {
        this.userSubscription = this.authService.user.subscribe(user=>{
            this.isAuthenticated = !user ? false : true;
            console.log(!user);
            console.log(!!user);
        });
    }    

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes();
    }
    
    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }
}