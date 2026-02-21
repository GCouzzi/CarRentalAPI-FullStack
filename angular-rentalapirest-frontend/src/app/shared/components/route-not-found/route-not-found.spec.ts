import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteNotFound } from './route-not-found';

describe('RouteNotFound', () => {
  let component: RouteNotFound;
  let fixture: ComponentFixture<RouteNotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RouteNotFound]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteNotFound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
