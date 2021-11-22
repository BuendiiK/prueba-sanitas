import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { LoremIpsum } from 'lorem-ipsum';
import { Image } from '../models/image';

@Injectable()
export class ImageService {
  private imageArray: Observable<any>;
  constructor(private http: HttpClient) {}

  // Función que carga el array de imágenes cuando se inicia la app
  init() {
    this.imageArray = new Observable((observer) => {
      this.getJSON(4000).subscribe((response: Image[]) => {
        observer.next(response);
      });
    });
  }

  // Contifuración del lorem ipsum
  private text = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  });

  // Servicio que devuelve un JSON de tipo Image[]
  private getJSON(limit: number): Observable<any> {
    return this.http.get(
      'data:application/json;charset=UTF-8,' +
        encodeURIComponent(JSON.stringify(this.generateJson(limit)))
    );
  }

  // Función de generación de un Json Aleatorio de tipo Image[]
  private generateJson(limit: number): Image[] {
    const images: Image[] = [];
    for (let index = 0; index < limit; index++) {
      const id: number = Math.trunc(Math.random() * (1084 - 1) + 1);
      const image: Image = new Image(
        id,
        `https://picsum.photos/id/${id}/500/500.jpg`,
        this.text.generateWords(5)
      );
      images.push(image);
    }
    return images;
  }

  public addImages(start: number, end: number, filter = ''): Observable<any> {
    return this.imageArray.pipe(
      map((res) => {
        if (filter === '') {
          return res.splice(start, end);
        } else {
          return res
            .filter(
              (x: Image) =>
                x.text.toLocaleLowerCase().includes(filter) ||
                x._id.toString().includes(filter)
            )
            .splice(start, end);
        }
      })
    );
  }
}
