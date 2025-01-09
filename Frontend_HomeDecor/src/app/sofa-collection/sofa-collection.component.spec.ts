import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SofaCollectionComponent } from './sofa-collection.component';

describe('SofaCollectionComponent', () => {
  let component: SofaCollectionComponent;
  let fixture: ComponentFixture<SofaCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SofaCollectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SofaCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
