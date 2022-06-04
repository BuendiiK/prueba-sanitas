import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, take } from 'rxjs';
import { LoremIpsum } from 'lorem-ipsum';
import { Image_ } from '../models/image';

@Injectable()
export class ImageService {
  private imageArray: Observable<Image_[]>;
  private images: Image_[] = [];
  noData = false;
  constructor(private http: HttpClient) {}

  // Función que carga el array de imágenes cuando se inicia la app
  init() {
    this.imageArray = new Observable((observer) => {
      this.getJSON(4000)
        .pipe(take(1))
        .subscribe((response: Image_[]) => {
          observer.next(response);
        });
    });
  }

  // Configuración del lorem ipsum
  private textIpsumConfig = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  });

  // Servicio que devuelve el resultado del JSON de tipo Image_[] generado siendo este
  // nuevo si no existe uno anterior. Si existe, devuelve el previamente generado.
  private getJSON(limit: number): Observable<Image_[]> {
    return this.http.get<Image_[]>(
      'data:application/json;charset=UTF-8,' +
        encodeURIComponent(
          JSON.stringify(
            this.images.length === 0 ? this.generateJson(limit) : this.images
          )
        )
    );
  }

  // Función que genera un JSON de tipo Image_[] de manera aleatoria
  private generateJson(limit: number): Image_[] {
    for (let index = 0; index < limit; index++) {
      // const id = Math.trunc(Math.random() * (1084 - 1) + 1);
      const id = index + 1;
      const text = this.textIpsumConfig.generateWords(5);
      const image: Image_ = new Image_(
        id,
        `https://picsum.photos/id/${id}/500/500.jpg`,
        text.charAt(0).toUpperCase() + text.slice(1)
      );
      this.images.push(image);
    }
    return this.images;
  }

  // Función que devuelve un array de objetos Image_ extraida del JSON generado y que filtra por id y texto
  public addImages(filter: string): Observable<Image_[]> {
    return this.imageArray.pipe(
      map((res) => {
        if (filter === '') {
          this.noData = false;
          return res;
        } else {
          const resFiltered = res.filter(
            (x: Image_) =>
              x.text.toLocaleLowerCase().includes(filter) ||
              x._id.toString().includes(filter)
          );
          resFiltered.length === 0
            ? (this.noData = true)
            : (this.noData = false);
          return resFiltered;
        }
      })
    );
  }

  // Funcion que devuelve si esxisten o no datos tras realizar una búsqueda
  noDataReturned() {
    return this.noData;
  }
}
