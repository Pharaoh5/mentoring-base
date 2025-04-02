import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {  MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { completedValidator } from "../../validators/completed-validator";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
  selector: "app-create-todo-form",
  templateUrl: "./create-todo-form.component.html",
  styleUrls: ["./create-todo-form.component.scss"],
  standalone: true,
  imports:[ReactiveFormsModule,MatButtonModule, MatInputModule, MatIconModule, MatDialogModule, MatTooltipModule, MatTooltipModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTodoFormComponent {

  @Output()
  createTodo = new EventEmitter()

  public form = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.minLength(3)]),
    userId: new FormControl("",[Validators.required, Validators.minLength(1)]),
    completed: new FormControl("", [Validators.required, completedValidator()]),
  })

  constructor() {
  }
}
