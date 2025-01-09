import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiningTabelCollectionComponent } from './dining-tabel-collection.component';

describe('DiningTabelCollectionComponent', () => {
  let component: DiningTabelCollectionComponent;
  let fixture: ComponentFixture<DiningTabelCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiningTabelCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiningTabelCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
