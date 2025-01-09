import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvSetsCollectionComponent } from './tv-sets-collection.component';

describe('TvSetsCollectionComponent', () => {
  let component: TvSetsCollectionComponent;
  let fixture: ComponentFixture<TvSetsCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TvSetsCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TvSetsCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
