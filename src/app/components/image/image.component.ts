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

  ngOnInit(): void {
    // En esta parte se puede realizar lo que se desee en caso de que la imagen no haya sido encontrada.
    // Por ejemplo, abajo no muestro la card con toda la info, pero lo que se podría hacer es añadir un EventEmitter
    // para que el padre borrase del JSON generado los objetos Imagen que no cargan las fotos.
    //
    // Aun así he optado por no añadir esta lógica debido a la carga de procesamiento que lleva.
    // Es por esto por lo que añadiré un mensaje de error en las imagenes que no cargan.
    //
    // this.testImage(this.image.photo).then(
    //   () => {
    //     // Success callback
    //     // console.log('Imagen encontrada', this.image.photo);
    //     this.showCard = true;
    //   },
    //   () => {
    //     // Error callback
    //     // console.log('Imagen no encontrada');
    //     this.showCard = false;
    //   }
    // );
  }

  imageError(id: number) {
    return ' La imagen ' + id + ' no ha sido encontrada.';
  }

  // Función que comprueba si la imagen existe. (No se usa. Explicado arriba)
  testImage(url: string) {
    const imgPromise = new Promise((resolve, reject) => {
      const imgElement = new Image();

      imgElement.addEventListener('load', function imgOnLoad() {
        resolve(this);
      });

      imgElement.addEventListener('error', function imgOnError() {
        reject();
      });

      imgElement.src = url;
    });

    return imgPromise;
  }
}
