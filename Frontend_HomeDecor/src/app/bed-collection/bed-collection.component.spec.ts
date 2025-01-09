import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BedCollectionComponent } from './bed-collection.component';

describe('BedCollectionComponent', () => {
  let component: BedCollectionComponent;
  let fixture: ComponentFixture<BedCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BedCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BedCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
