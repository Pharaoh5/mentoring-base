import { createActionGroup, props } from "@ngrx/store";
import { Todo } from "../../interface/todo.interface";

export const TodosActions = createActionGroup({
    source: "Todos",
    events: {
        "set": props<{todos: Todo[]}>(),
        "edit": props<{todo: Todo}>(),
        "delete": props<{id: number}>(),
        "create": props<{todo: Todo}>(),
    }
})
