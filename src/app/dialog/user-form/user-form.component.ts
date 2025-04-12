import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [NgIf, MatInputModule, MatButtonModule, ReactiveFormsModule,MatDialogModule, MatFormFieldModule, MatTooltipModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  public readonly data = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    if (this.data.user) {
      this.form.patchValue({
        ...this.data.user,
        companyName: this.data.user.company.name
      });
    }
  }

  form = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(3),
    ]),
    website: new FormControl('', [
      Validators.minLength(3),
      Validators.required,
      Validators.pattern(
        "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?",
      ),
    ]),
    companyName: new FormControl('', [
      Validators.minLength(3),
      Validators.required,
      Validators.pattern("^[a-zA-Zа-яА-Я0-9\\s-]*$"),
    ]),
  });
}
