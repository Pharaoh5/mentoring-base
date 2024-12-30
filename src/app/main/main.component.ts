import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  isShowBanner = true;

  readonly newPage = newPage
}

const newPage = [5, 4, 3, 2, 1]