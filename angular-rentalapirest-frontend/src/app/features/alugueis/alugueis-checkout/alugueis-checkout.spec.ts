import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlugueisCheckout } from './alugueis-checkout';


describe('AlugueisCheckout', () => {
  let component: AlugueisCheckout;
  let fixture: ComponentFixture<AlugueisCheckout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlugueisCheckout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlugueisCheckout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
