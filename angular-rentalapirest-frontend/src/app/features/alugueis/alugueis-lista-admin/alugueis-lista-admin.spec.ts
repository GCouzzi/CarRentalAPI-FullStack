import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlugueisListaAdmin } from './alugueis-lista-admin';

describe('AlugueisListaAdmin', () => {
  let component: AlugueisListaAdmin;
  let fixture: ComponentFixture<AlugueisListaAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlugueisListaAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlugueisListaAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
