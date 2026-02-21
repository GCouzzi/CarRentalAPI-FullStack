import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomoveisLista } from './automoveis-lista';

describe('AutomoveisLista', () => {
  let component: AutomoveisLista;
  let fixture: ComponentFixture<AutomoveisLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutomoveisLista]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomoveisLista);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
