import { TestBed } from '@angular/core/testing';

import { NgxThetellerService } from './ngx-theteller.service';

describe('NgxThetellerService', () => {
  let service: NgxThetellerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxThetellerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
