import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlugueisSideBar } from './alugueis-side-bar';

describe('AlugueisSideBar', () => {
  let component: AlugueisSideBar;
  let fixture: ComponentFixture<AlugueisSideBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlugueisSideBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlugueisSideBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
