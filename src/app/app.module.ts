import {
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ImageComponent } from './components/image/image.component';
import { GridComponent } from './components/grid/grid.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { ImageService } from './services/image.service';
import { LoremIpsum } from 'lorem-ipsum';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [AppComponent, ImageComponent, GridComponent],
  imports: [
    // Angular
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    //Material
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatDividerModule,
    MatToolbarModule,
    ScrollingModule,
    MatGridListModule,
    MatProgressBarModule,
    MatDividerModule,
    //HTML Layout
    FlexLayoutModule,
    //Infinite scroll
    InfiniteScrollModule,
    // Lazy loading for images
    LazyLoadImageModule
  ],
  exports: [GridComponent],
  providers: [
    // Lorem Ipsum generator
    LoremIpsum,
    // Image service
    ImageService,
    // Provider encargado de llamar al servicio de imagenes cuando se carga el módulo.
    {
      provide: APP_INITIALIZER,
      useFactory: initFunction,
      deps: [ImageService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

// Función que se ejecuta cuendo se carga el módulo. Llama a la función del servicio para que cargue JSON de imágenes
export function initFunction(config: ImageService) {
  return () => config.init();
}
