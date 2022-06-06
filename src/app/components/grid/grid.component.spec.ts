import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { ImageService } from 'src/app/services/image.service';

import { GridComponent } from './grid.component';

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  let compiled: HTMLDivElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GridComponent],
      imports: [HttpClientModule, AppModule],
      providers: [ImageService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('Se crea el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Renderiza el título', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('mat-toolbar')?.textContent).toContain(
      'Prueba Sanitas'
    );
  });

  it('Renderiza la búsqueda', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('input')?.id).toEqual('search-input');
  });

  it('Mientras se cargan las imagenes aparece la barra de progreso y un mensaje', () => {
    fixture.detectChanges();
    expect(compiled.querySelector('mat-progress-bar')).toBeTruthy;
    expect(compiled.querySelector('h1')?.innerHTML).toEqual(
      'Cargando imágenes. Espere...'
    );
  });

  it('Al cargar las imagenes desaparece el la barra de progreso y el mensaje', (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(compiled.querySelector('mat-progress-bar')).toBeNull;
      expect(compiled.querySelector('h1')).toBeNull;
      done();
    });
  });

  it('Se cargan 4000 imágenes', (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(compiled.querySelectorAll('app-image').length).toEqual(4000);
      done();
    });
  });
});
