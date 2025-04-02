import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { completedValidator } from "../../validators/completed-validator";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    selector: "app-edit-todo-dialog",
    templateUrl: "./edit-todo-dialog-component.html",
    imports: [MatButtonModule,MatInputModule,ReactiveFormsModule,MatDialogModule, MatFormFieldModule,MatIcon, MatTooltipModule],
})
export class EditTodoDialogComponent {
    private data = inject(MAT_DIALOG_DATA)

    public form = new FormGroup({
        id: new FormControl(this.data.todo.id),
        title: new FormControl(this.data.todo.title , [Validators.required, Validators.minLength(3)]),
        userId: new FormControl(this.data.todo.userId ,[Validators.required, Validators.minLength(1)]),
        completed: new FormControl( this.data.todo.completed ? "да": "нет", [Validators.required, completedValidator()]),
    })
}
