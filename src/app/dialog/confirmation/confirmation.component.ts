import { Component, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";

@Component({
  standalone: true,
  selector: "app-user-confirmation",
  templateUrl: "./confirmation.component.html",
  imports: [MatButtonModule, MatDialogModule],
})
export class ConfirmationComponent {
  readonly data = inject(MAT_DIALOG_DATA);
}
