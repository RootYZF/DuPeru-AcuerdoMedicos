import { TestBed } from '@angular/core/testing';

import { LoginBdService } from './login-bd.service';

describe('LoginBdService', () => {
  let service: LoginBdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginBdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
