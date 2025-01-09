import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductsDecorComponent } from './all-products-decor.component';

describe('AllProductsDecorComponent', () => {
  let component: AllProductsDecorComponent;
  let fixture: ComponentFixture<AllProductsDecorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllProductsDecorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProductsDecorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
