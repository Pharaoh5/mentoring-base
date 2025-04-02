import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatTooltipModule} from '@angular/material/tooltip';

interface UserForm {
  id: FormControl<number>;
  name: FormControl<string>;
  email: FormControl<string>;
  website: FormControl<string>;
  companyName: FormControl<string>;
}

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog-component.html',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgIf,
    MatTooltipModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditUserDialogComponent {
  private readonly data = inject(MAT_DIALOG_DATA);

  form = new FormGroup({
    id: new FormControl<UserForm>(this.data.user.id),
    name: new FormControl(this.data.user.name, [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl(this.data.user.email, [
      Validators.required,
      Validators.email,
      Validators.minLength(3),
    ]),
    website: new FormControl(this.data.user.website, [
      Validators.minLength(3),
      Validators.required,
      Validators.pattern(
        '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?',
      ),
    ]),
    companyName: new FormControl(this.data.user.company.name, [
      Validators.minLength(3),
      Validators.required,
      Validators.pattern('^[a-zA-Zа-яА-Я0-9-\\s]*$'),
    ]),
  });
}
