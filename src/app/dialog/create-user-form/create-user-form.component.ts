import { NgIf } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: "app-create-user-form",
  templateUrl: "./create-user-form.component.html",
  styleUrls: ["./create-user-form.component.scss"],
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    NgIf,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUserFormComponent {
  form = new FormGroup({
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
  constructor() {
    
  }
}
