import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageDecorComponent } from './home-page-decor.component';

describe('HomePageDecorComponent', () => {
  let component: HomePageDecorComponent;
  let fixture: ComponentFixture<HomePageDecorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageDecorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageDecorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
