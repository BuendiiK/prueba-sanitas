import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Image_ } from 'src/app/models/image';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  constructor(public imageService: ImageService) {}

  public data: Image_[] = [];
  public imageArray: Image_[] = [];
  public allImageArray: Image_[] = [];
  public inputSearch = '';

  private filterValue: string;

  ngOnInit() {
    this.refreshDataSource('');
  }

  // Función que carga un array de objetos Image_ extraida del JSON generado y que filtra por id y texto
  public refreshDataSource(filterValue: string) {
    this.imageService
      .addImages(filterValue)
      .pipe(take(1))
      .subscribe((response) => {
        this.imageArray = response;
      });
  }

  // Función que extrae el valor del texto introducido, lo procesa y lo pasa a la función para que carge las imagenes filtradas
  public applyFilter(filter: KeyboardEvent) {
    this.imageArray = [];
    this.filterValue = (<HTMLTextAreaElement>filter.target).value
      .trim()
      .toLowerCase();
    this.refreshDataSource(this.filterValue);
  }

  // Funcion trackBy para optimizar la carga del ngFor
  public trackById(index: number, item: Image_) {
    return item.id;
  }
}
