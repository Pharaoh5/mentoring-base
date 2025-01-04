import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Todo } from "./todo.interface";

@Injectable({providedIn: 'root'})
export class TodosService {
    private todosSubject$ = new BehaviorSubject<Todo[]>([])
    todos = this.todosSubject$.asObservable()

    setTodos(todos: Todo[]) {
        this.todosSubject$.next(todos)
    }
    editTodo(editedUser: Todo) {
        this.todosSubject$.next(
            this.todosSubject$.value.map(
                user => {
                    if (user.id === editedUser.id) {
                        return editedUser
                    } else {
                        return user
                    }
                }
            )
        )
    }
    deleteTodo (todoId: number) {
        this.todosSubject$.next(
            this.todosSubject$.value.filter(
                user => {
                    if (user.id === todoId) {
                        return false
                    } else {
                        return true
                    }
                }
            )
        )
    }
    createTodo (createTodo: Todo) {
        this.todosSubject$.next(
            [...this.todosSubject$.value, createTodo]
        )
    }
}