import { TestBed } from '@angular/core/testing';

import { ProdutosServiceService } from './produtos-service.service';

describe('ProdutosServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdutosServiceService = TestBed.get(ProdutosServiceService);
    expect(service).toBeTruthy();
  });
});
