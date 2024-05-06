import { TestBed } from '@angular/core/testing';

import { ConnecteddevicesService } from './connecteddevices.service';

describe('ConnecteddevicesService', () => {
  let service: ConnecteddevicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnecteddevicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
