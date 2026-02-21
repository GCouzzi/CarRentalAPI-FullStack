import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomoveisNovo } from './automoveis-novo';

describe('AutomoveisNovo', () => {
  let component: AutomoveisNovo;
  let fixture: ComponentFixture<AutomoveisNovo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutomoveisNovo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomoveisNovo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
