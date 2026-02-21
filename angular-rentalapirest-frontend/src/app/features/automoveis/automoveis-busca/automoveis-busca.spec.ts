import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomoveisBusca } from './automoveis-busca';

describe('AutomoveisBusca', () => {
  let component: AutomoveisBusca;
  let fixture: ComponentFixture<AutomoveisBusca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutomoveisBusca]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomoveisBusca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
