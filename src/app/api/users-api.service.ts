import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { User } from "../interface/user.interface";

@Injectable({providedIn: "root"})
export class UsersApiService {
    readonly usersApiService = inject(HttpClient);

    getUsers() {
        return this.usersApiService.get<User[]>("https://jsonplaceholder.typicode.com/users");
    }
}
