import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from './auth.service';

const fakeRouter = {
  navigate: (): void => {}
}

const fakeHttpClient = {
  get: jasmine.createSpy('get')
}

fdescribe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {provide: Router, useValue: fakeRouter},
        {provide: HttpClient, useValue: fakeHttpClient}
      ],
    });
    service = TestBed.inject(AuthService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getToken() should get token form localstorage', () => {
    localStorage.setItem('access_token', 'testToken')
    expect(service.getToken()).toBe('testToken')
    localStorage.clear()
  })

  it('setToken() should set token in localstorage', () => {
    service.setToken('testToken')
    expect(localStorage.getItem('access_token')).toBe('testToken')
    localStorage.clear()
  })

  it('logout() should remove token from localstorage', () => {
    const spy = spyOn(fakeRouter, 'navigate').and.callThrough()
    localStorage.setItem('access_token', 'testToken')
    service.logout()
    expect(localStorage.getItem('access_token')).toBe(null)
    expect(spy).toHaveBeenCalled()
  })

  it('isLogin() should get login state', done => {
    fakeHttpClient.get.and.returnValue(of(true))
    const response = service.isLogin()
    response.subscribe(r => {
      console.log(r)
      expect(r).toBeTruthy()
      done()
    })
  })
});
