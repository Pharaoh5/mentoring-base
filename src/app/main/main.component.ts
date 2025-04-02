import { NgFor, NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

@Component({
  selector: "app-main",
  standalone: true,
  imports: [NgIf, NgFor, MatCardModule, MatButtonModule],
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  readonly newPage = newPage;
}

const newPage = [5, 4, 3, 2, 1];
