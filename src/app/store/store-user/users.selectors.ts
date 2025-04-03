import { createSelector } from "@ngrx/store";
import { User } from "../../interface/user.interface";

interface UserState {
    users: User[];
}

interface AppState {
    users: UserState;
}

const selectUsersFeature = (state: AppState) => state.users

export const selectUsers = createSelector(
  selectUsersFeature,
    (state: UserState) => state.users
)
