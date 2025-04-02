import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UsersApiService } from "../users-api.service.js";
import { UserCardComponent } from "./user-card/user-card.component";
import { CreateUserFormComponent } from "../dialog/create-user-form/create-user-form.component.js";
import { User } from "../user.interface.ts.js";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../snackbar/snackbar.component.js";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { Store } from "@ngrx/store";
import { UsersActions } from "../store/store-user/users.actions.js";
import { selectUsers } from "../store/store-user/users.selectors.js";

@Component({
  selector: "app-users-list",
  standalone: true,
  imports: [NgFor, UserCardComponent, AsyncPipe, MatCardModule,MatButtonModule],
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly usersApiService = inject(UsersApiService);

  private readonly dialog = inject(MatDialog);

  private _snackBar = inject(MatSnackBar);

  private readonly store = inject(Store)
  public readonly users$ = this.store.select(selectUsers)

  deleteUser(id: number) {
    this.store.dispatch(UsersActions.delete({id}))
  }

  createUser() {
    const dialogRef = this.dialog.open(CreateUserFormComponent);

    dialogRef.afterClosed().subscribe((form) => {
      if (form) {
        this.store.dispatch(UsersActions.create({
          user:{
          id: new Date().getTime(),
          name: form.name,
          email: form.email,
          website: form.website,
          company: {
            name: form.companyName,
          },
        }
        }))
        this._snackBar.openFromComponent(SnackbarComponent, {
                  duration: 5000,
                  data: {
                  isCreateUser: true,
                  }
                });
      }
    });
  }

  editUser(user: User): void {
    this.store.dispatch(UsersActions.edit({user}))
  }

  constructor() {
    this.usersApiService
      .getUsers()
      .subscribe((item: User[]) => {
        this.store.dispatch(UsersActions.set({users: item}))
      }
    );
  }
}
