import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { ImageService } from 'src/app/services/image.service';

import { ImageComponent } from './image.component';

describe('ImageComponent', () => {
  let component: ImageComponent;
  let fixture: ComponentFixture<ImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageComponent],
      imports: [HttpClientModule, AppModule],
      providers: [ImageService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageComponent);
    component = fixture.componentInstance;
    component.image = {
      id: 1,
      photo: 'https://i.picsum.photos/id/9/500/500.jpg',
      text: 'Prueba texto'
    };
    fixture.detectChanges();
  });

  it('Se crea el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Renderiza el @Input Image_', async () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.innerHTML).toContain('https://i.picsum.photos/id/9/5');
    expect(compiled.querySelector('img').id).toContain('1');
    expect(compiled.textContent.trim()).toBe('Prueba texto');
  });
});
