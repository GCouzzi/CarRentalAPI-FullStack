import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Automoveis } from './automoveis';

describe('Automoveis', () => {
  let component: Automoveis;
  let fixture: ComponentFixture<Automoveis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Automoveis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Automoveis);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
