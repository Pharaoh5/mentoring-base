import { createFeature, createReducer, on } from "@ngrx/store";
import { User } from "../../interface/user.interface";
import { UsersActions } from "./users.actions.js";

interface UserState {
    users: User[];
}

const initialState: UserState = {
    users: [],
};

export const userReducer = createFeature({
    name: "users",
    reducer: createReducer(
        initialState,
        on(UsersActions.set, (state, payload) => ({
            ...state,
            users: payload.users
        })),
        on(UsersActions.edit, (state, {user}) => ({
            ...state,
            users: state.users.map((t) => (t.id === user.id ? user : t))
        })),
        on(UsersActions.create, (state, payload) => ({
            ...state,
            users: [...state.users, payload.user]
        })),
        on(UsersActions.delete, (state, payload) =>({
            ...state,
            users: state.users.filter(user => user.id !== payload.id)
        }))
    )
})
