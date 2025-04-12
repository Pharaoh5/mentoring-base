import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from "@angular/core";
import { User } from "../../interface/user.interface";
import { MatDialog } from "@angular/material/dialog";
import { EditUserDialogComponent } from "../../dialog/edit-user-dialog-component/edit-user-dialog-component";
import { MatSnackBar} from "@angular/material/snack-bar";
import { SnackbarComponent } from "../../snackbar/snackbar.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { SwadowDirective } from "../../directives/swadow.directive";
import { ConfirmationComponent } from "../../dialog/confirmation/confirmation.component";

@Component({
  selector: "app-user-card",
  standalone: true,
  templateUrl: "./user-card.component.html",
  styleUrls: ["./user-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatIconModule, MatButtonModule, SwadowDirective],
})
export class UserCardComponent {
  @Input()
  user!: User;

  @Output()
  userCardDelete = new EventEmitter();

  @Output()
  userCardEdit = new EventEmitter<User>();

  private readonly dialog = inject(MatDialog);

  private _snackBar = inject(MatSnackBar);

  onUserDelete(UserId: number) {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        text: "пользователя"
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userCardDelete.emit(UserId);
        this._snackBar.openFromComponent(SnackbarComponent, {
          duration: 5000,
          data: {
            isDeleteUser: true,
          }
        });
      }
    });
  }

  onUserEdit() {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: {user: this.user,},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id === this.user.id) {
        this.userCardEdit.emit({
          ...this.user,
          ...result,
          company: { name: result.companyName },
        });
        this._snackBar.openFromComponent(SnackbarComponent, {
          duration: 5000,
          data: {
          isEditUser: true,
          }
        });
      }
    });
  }
}
