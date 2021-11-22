import { APP_INITIALIZER, NgModule } from '@angular/core';
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

import { ScrollingModule } from '@angular/cdk/scrolling';
import { ImageService } from './services/image.service';
import { LoremIpsum } from 'lorem-ipsum';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, ImageComponent, GridComponent],
  imports: [
    BrowserModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    ScrollingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    HttpClientModule,
    MatGridListModule,
    FlexLayoutModule,
    FormsModule,
    InfiniteScrollModule,
    BrowserAnimationsModule,
  ],
  exports: [GridComponent],
  providers: [
    LoremIpsum,
    ImageService,
    {
      provide: APP_INITIALIZER,
      useFactory: initFunction,
      deps: [ImageService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function initFunction(config: ImageService) {
  return () => config.init();
}
