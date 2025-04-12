import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { UsersActions } from './users.actions';
import { User } from '../../interface/user.interface';

@Injectable()
export class UsersEffects {
  // Обновляет localStorage при любом изменении users
  syncUsersWithLocalStorage$ = createEffect(
    () => this.actions$.pipe(
      ofType(
        UsersActions.set,
        UsersActions.create,
        UsersActions.edit,
        UsersActions.delete
      ),
      tap((action) => {
        try {
          const state = JSON.parse(localStorage.getItem('users') || '[]');
          let updatedState;

          switch (action.type) {
            case UsersActions.set.type:
              updatedState = action.users;
              break;
            case UsersActions.create.type:
              updatedState = [...state, action.user];
              break;
            case UsersActions.edit.type:
              updatedState = state.map((user: User) =>
                user.id === action.user.id ? action.user : user
              );
              break;
            case UsersActions.delete.type:
              updatedState = state.filter((user: User)=> user.id !== action.id);
              break;
          }
          localStorage.setItem('users', JSON.stringify(updatedState));
        } catch (e) {
          console.error('Ошибка синхронизации с localStorage:', e);
        }


      })
    ),
    { dispatch: false } // Важно: эффект не должен диспатчить новые actions
  );

  constructor(private actions$: Actions) {}
}
