import { ApplicationConfig, isDevMode } from "@angular/core";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient } from "@angular/common/http";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideStore } from '@ngrx/store';
import { userReducer } from "./store/store-user/user.reducer";
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { todoReducer } from "./store//store-todo/todo.reducer";
import { provideEffects } from '@ngrx/effects';
import { UsersEffects } from "./store/store-user/users.effects";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync("noop"),
    provideAnimationsAsync(),
    provideStore({
        todos: todoReducer,
        users: userReducer.reducer,
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(
      UsersEffects
    )
]
};
