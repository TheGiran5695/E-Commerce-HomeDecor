import { TestBed } from '@angular/core/testing';

import { SofaCollectionService } from './sofa-collection.service';

describe('SofaCollectionService', () => {
  let service: SofaCollectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SofaCollectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
