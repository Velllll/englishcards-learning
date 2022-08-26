import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

const fakeRouter = {
  navigate: (): void => {}
}

describe('AuthService', () => {
  let service: AuthService;
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: Router, useValue: fakeRouter}
      ],
      imports: [
        HttpTestingController,
      ]
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get token form localstorage', () => {
    localStorage.setItem('access_token', 'testToken')
    expect(service.getToken()).toBe('testToken')
    localStorage.clear()
  })

  it('should set token in localstorage', () => {
    service.setToken('testToken')
    expect(localStorage.getItem('access_token')).toBe('testToken')
    localStorage.clear()
  })

  it('should remove token from localstorage', () => {
    const spy = spyOn(fakeRouter, 'navigate').and.callThrough()
    localStorage.setItem('access_token', 'testToken')
    service.logout()
    expect(localStorage.getItem('access_token')).toBe(null)
    expect(spy).toHaveBeenCalled()
  })
});
