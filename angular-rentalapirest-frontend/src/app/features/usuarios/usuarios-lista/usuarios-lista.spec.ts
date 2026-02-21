import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosLista } from './usuarios-lista';

describe('UsuariosLista', () => {
  let component: UsuariosLista;
  let fixture: ComponentFixture<UsuariosLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuariosLista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosLista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
