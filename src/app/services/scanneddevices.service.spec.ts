import { TestBed } from '@angular/core/testing';

import { ScanneddevicesService } from './scanneddevices.service';

describe('ScanneddevicesService', () => {
  let service: ScanneddevicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScanneddevicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
