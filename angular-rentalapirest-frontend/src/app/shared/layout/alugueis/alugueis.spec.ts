import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Alugueis } from './alugueis';

describe('Alugueis', () => {
  let component: Alugueis;
  let fixture: ComponentFixture<Alugueis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Alugueis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Alugueis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
