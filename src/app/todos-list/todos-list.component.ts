import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { TodosApiService } from "../api/todos-api.service";
import { Todo } from "../interface/todo.interface";
import { TodosCardComponent } from "./todos-card/todos-card.component";
import { AsyncPipe, NgFor } from "@angular/common";
import { MatDialog } from "@angular/material/dialog";
import { MatButton } from "@angular/material/button";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "../snackbar/snackbar.component";
import { Store } from "@ngrx/store";
import { selectTodos } from "../store/store-todo/todos.selectors";
import { TodosActions } from "../store/store-todo/todos.actions";
import { TodoFormComponent } from "../dialog/todo-form/todo-form.component";

@Component({
  selector: "app-todos-list",
  standalone: true,
  imports: [TodosCardComponent, NgFor, AsyncPipe, MatButton],
  providers: [],
  templateUrl: "./todos-list.component.html",
  styleUrls: ["./todos-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListComponent {
  readonly todosApiService = inject(TodosApiService);

  public readonly store = inject(Store)

  public readonly todos$ = this.store.select(selectTodos)
  private dialog = inject(MatDialog)

  private _snackBar = inject(MatSnackBar);

  deleteTodo (id: number) {
    this.store.dispatch(TodosActions.delete({id}))
  }

  editTodo(todo: Todo) {
    this.store.dispatch(TodosActions.edit({todo}))
  }

  createTodo() {
    const dialogRef = this.dialog.open(TodoFormComponent, {
      data: {
        text: "Создать задачу"
      }
    })

    dialogRef.afterClosed().subscribe(form => {
      if (form) {
        this.store.dispatch(TodosActions.create({
          todo:{
            id: new Date().getTime(),
            title: form.title,
            userId: form.userId,
            completed: form.completed,
        }}))
        this._snackBar.openFromComponent(SnackbarComponent, {
          duration: 5000,
                  data: {
                  isCreateTodo: true,
                  }
        })
      }
    });
  }

  constructor() {
    const todosStorage = localStorage.getItem("todos");

    if (todosStorage) {
      try {
        this.store.dispatch(TodosActions.set({todos: JSON.parse(todosStorage)}));
      } catch (error) {
        console.error("Ошибка парсинга: " + error);
        localStorage.removeItem("todos");
        this.ApiFromLoad();
      }
    } else {
      this.ApiFromLoad()
    }
}

private ApiFromLoad () {
  this.todosApiService.getTodos().subscribe({
    next: (todos: Todo[]) =>
      this.store.dispatch(TodosActions.set({todos: todos})),
    error: (erorr) => console.error("Ошибка: ", erorr)
  })
}
}
