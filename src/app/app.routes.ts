import { Routes } from "@angular/router";
import { UsersListComponent } from "./user-list/users-list.component";
import { MainComponent } from "./main/main.component";
import { TodosListComponent } from "./todos-list/todos-list.component";
import { AdminComponent } from "./admin/admin.component";
import { AdminGuard } from "./guard/guard.guard";

export const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        component: MainComponent,
    },
    {
        path: "users",
        component: UsersListComponent,
    },
    {
        path: "todos",
        component: TodosListComponent,
    },
    {
        path: "admin",
        component: AdminComponent,
        canActivate: [AdminGuard]
    }
];
