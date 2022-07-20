import { TestBed } from '@angular/core/testing';

import { WriteLogService } from './write-log.service';

describe('WriteLogService', () => {
  let service: WriteLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WriteLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
