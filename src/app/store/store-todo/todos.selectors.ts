import { createSelector } from "@ngrx/store";
import { Todo } from "../../todo.interface";

interface TodosState {
    todos: Todo[];
}

interface AppState {
    todos: TodosState;
}

const selectTodosFeature = (state: AppState) => state.todos

export const selectTodos = createSelector(
    selectTodosFeature,
    (state: TodosState) => state.todos
)