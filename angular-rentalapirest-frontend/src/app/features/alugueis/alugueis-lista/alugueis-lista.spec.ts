import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlugueisLista } from './alugueis-lista';

describe('AlugueisLista', () => {
  let component: AlugueisLista;
  let fixture: ComponentFixture<AlugueisLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlugueisLista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlugueisLista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
