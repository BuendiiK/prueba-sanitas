import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Image } from 'src/app/models/image';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  constructor(public imageService: ImageService) {
    this.actualPage = 1;
  }

  public data: Image[] = [];
  public dataCopy: Image[] = [];
  public imageArray: any;
  public allImageArray: Image[] = [];

  public inputSearch = '';
  private filterValue: string;

  private finishPage = 250;
  private actualPage: number;
  private limitNumberImage = 16;

  public subscriptions: Subscription[] = [];

  ngOnInit() {
    this.refreshDataSource(0, this.limitNumberImage);
  }

  /** Función que carga los datos de las fotos */
  public refreshDataSource(start: number, end: number, filterValue = '') {
    this.imageService
      .addImages(start, end, filterValue)
      .subscribe((response) => {
        this.imageArray = response;
        console.log(response.length);
      });
  }

  /** Función de filtrado de fotos */
  public applyFilter(filter: any) {
    this.filterValue = filter.target.value.trim().toLowerCase();
    this.refreshDataSource(0, this.limitNumberImage, this.filterValue);
  }

  public trackById(index: number, item: Image) {
    return item._id;
  }

  public onScroll() {
    if (this.actualPage < this.finishPage) {
      this.refreshDataSource(
        this.imageArray.length,
        this.imageArray.length + 16,
        this.filterValue
      );
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
