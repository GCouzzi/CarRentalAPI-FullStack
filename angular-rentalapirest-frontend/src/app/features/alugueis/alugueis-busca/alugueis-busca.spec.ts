import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlugueisBusca } from './alugueis-busca';

describe('AlugueisBusca', () => {
  let component: AlugueisBusca;
  let fixture: ComponentFixture<AlugueisBusca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlugueisBusca]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlugueisBusca);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
