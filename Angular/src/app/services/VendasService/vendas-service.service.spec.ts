import { TestBed } from '@angular/core/testing';

import { VendasServiceService } from './vendas-service.service';

describe('VendasServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VendasServiceService = TestBed.get(VendasServiceService);
    expect(service).toBeTruthy();
  });
});
