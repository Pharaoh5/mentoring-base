import { ChangeDetectionStrategy, Component, inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { completedValidator } from "../../validators/completed-validator";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: "app-edit-todo-dialog",
    templateUrl: "./todo-form.component.html",
    imports: [MatButtonModule,MatInputModule,ReactiveFormsModule,MatDialogModule, MatFormFieldModule,MatIcon, MatTooltipModule],
})
export class TodoFormComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef);
    public data = inject(MAT_DIALOG_DATA)

  ngOnInit(): void {
    if (this.data.todo) {
      this.form.patchValue({
        ...this.data.todo,
        completed: this.data.todo.completed ? "да": "нет",
      });
    }
  }
    public form = new FormGroup({
        id: new FormControl(null),
        title: new FormControl("" , [Validators.required, Validators.minLength(3)]),
        userId: new FormControl("",[Validators.required, Validators.minLength(1)]),
        completed: new FormControl("", [Validators.required, completedValidator()]),
    })

    saveForm() {
        const completed = this.form.value.completed
        this.dialogRef.close(
          {
            ...this.form.value,
            completed: completed === "Да" ? true :
            completed === "даa" ? true :
            completed === "даaa" ? true :
            completed === "yes" ? true :
            completed === "нет" ? false :
            completed === "неет" ? false :
            completed === "нееет" ? false :
            completed === "no" ? false : false
          }
        );
    }
}
