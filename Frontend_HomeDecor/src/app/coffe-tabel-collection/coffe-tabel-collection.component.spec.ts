import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoffeTabelCollectionComponent } from './coffe-tabel-collection.component';

describe('CoffeTabelCollectionComponent', () => {
  let component: CoffeTabelCollectionComponent;
  let fixture: ComponentFixture<CoffeTabelCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoffeTabelCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoffeTabelCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
