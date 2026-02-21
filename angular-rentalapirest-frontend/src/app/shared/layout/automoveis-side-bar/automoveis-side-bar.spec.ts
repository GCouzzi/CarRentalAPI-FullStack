import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomoveisSideBar } from './automoveis-side-bar';

describe('AutomoveisSideBar', () => {
  let component: AutomoveisSideBar;
  let fixture: ComponentFixture<AutomoveisSideBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutomoveisSideBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomoveisSideBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
