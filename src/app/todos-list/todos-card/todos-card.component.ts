import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { Todo } from "../../todo.interface";
import { MatDialog } from "@angular/material/dialog";
import { TodoConfirmationComponent } from "./todo-confirmation.component.ts/todo-confirmation.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../../snackbar/snackbar.component";
import { EditTodoDialogComponent } from "../../dialog/edit-todo-dialog-component/edit-todo-dialog-component";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { TruncatePipe } from "../../truncate.pipe";
import { SwadowDirective } from "../../directives/swadow.directive";

@Component({
  selector: "app-todos-card",
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, TruncatePipe, SwadowDirective],
  templateUrl: "./todos-card.component.html",
  styleUrls: ["./todos-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosCardComponent {
  @Input()
  todo!: Todo;

  private dialog = inject(MatDialog)
  private _snackBar = inject(MatSnackBar);

  @Output()
  deleteTodo = new EventEmitter()
  @Output()
  editTodo = new EventEmitter()

  onDeleteTodo(todoId: number) {
    const dialogRef = this.dialog.open(TodoConfirmationComponent)

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.deleteTodo.emit(todoId);
        this._snackBar.openFromComponent(SnackbarComponent, {
          duration: 5000,
          data: {
            isDeleteTodo: true,
          }
        })
      };
    })
  }
  onEditTodo() {
    const dialogRef = this.dialog.open(EditTodoDialogComponent, {
      data: {
        todo: this.todo
      }
    })
    dialogRef.afterClosed().subscribe(
      (form) => {
        if(form) {
          this.editTodo.emit(form);
          this._snackBar.openFromComponent(SnackbarComponent, {
            duration: 5000,
            data: {
              isEditTodo: true,
            }
          })
        };
      }
    )
  }
}
