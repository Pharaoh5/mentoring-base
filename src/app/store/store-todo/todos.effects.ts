import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs/operators';
import { TodosActions } from './todos.actions';
import { Todo } from '../../interface/todo.interface';
import { Store } from '@ngrx/store';
import { selectTodos } from '../store-todo/todos.selectors';

@Injectable()
export class TodosEffects {
  private readonly store = inject(Store)
  // Обновляет localStorage при любом изменении users
  syncUsers$ = createEffect(
    () => this.actions$.pipe(
      ofType(
        TodosActions.set,
        TodosActions.edit,
        TodosActions.delete,
        TodosActions.create,),
      withLatestFrom(this.store.select(selectTodos)),
      tap(([action, todos]) => localStorage.setItem('todos', JSON.stringify(todos)))
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}
