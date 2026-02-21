import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosBusca } from './usuarios-busca';

describe('UsuariosBusca', () => {
  let component: UsuariosBusca;
  let fixture: ComponentFixture<UsuariosBusca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuariosBusca]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosBusca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
