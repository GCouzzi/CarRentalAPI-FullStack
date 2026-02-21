import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlugueisNovo } from './alugueis-novo';

describe('AlugueisNovo', () => {
  let component: AlugueisNovo;
  let fixture: ComponentFixture<AlugueisNovo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlugueisNovo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlugueisNovo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
