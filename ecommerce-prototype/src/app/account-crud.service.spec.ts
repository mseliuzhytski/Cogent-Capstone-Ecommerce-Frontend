import { TestBed } from '@angular/core/testing';

import { AccountCrudService } from './account-crud.service';

describe('AccountCrudService', () => {
  let service: AccountCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
