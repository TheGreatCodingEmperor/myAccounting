import { TestBed } from '@angular/core/testing';

import { ElFinderService } from './el-finder.service';

describe('ElFinderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ElFinderService = TestBed.get(ElFinderService);
    expect(service).toBeTruthy();
  });
});
