import { Component, Input, OnInit } from '@angular/core';
import { Image_ } from 'src/app/models/image';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  @Input() image: Image_;
  // showCard: boolean; Abría que añadirlo como ngIf en la <mat-card>

  constructor() {}

  ngOnInit(): void {}

  imageError(id: number): string {
    return ' La imagen ' + id + ' no ha sido encontrada.';
  }
}
