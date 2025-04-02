import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "../../../user.interface.ts.js";
import { userReducer } from "./user.reducer.js";

interface UserState {
    users: User[];
}

interface AppState {
    users: UserState;
}

const {selectUsersState} = userReducer

export const selectUsers = createSelector(
    selectUsersState,
    (state: UserState) => state.users
)
