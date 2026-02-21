import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosSideBar } from './usuarios-side-bar';

describe('UsuariosSideBar', () => {
  let component: UsuariosSideBar;
  let fixture: ComponentFixture<UsuariosSideBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsuariosSideBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosSideBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
