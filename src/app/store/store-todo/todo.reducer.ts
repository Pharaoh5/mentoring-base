import { createReducer, on } from "@ngrx/store";
import { Todo } from "../../todo.interface";
import { TodosActions } from "./todos.actions";

export interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

export const todoReducer = createReducer(
    initialState,
    on(TodosActions.set, (state, payload) => ({
        ...state,
        todos: payload.todos
    })),
    on(TodosActions.create, (state, payload) =>({
        ...state,
        todos: [...state.todos, payload.todo]
    })),
    on(TodosActions.edit, (state, {todo}) => ({
        ...state,
        todos: state.todos.map((t) => (t.id === todo.id ? todo : t))
    })),
    on(TodosActions.delete, (state, payload) =>({
        ...state,
        todos: state.todos.filter((todo) =>(todo.id !== payload.id))
    }))
)