import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterStub } from '../../testing-stub/router-stub.mock';

const routerStub = new RouterStub();

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      imports: [
        HttpClientTestingModule
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers:  [
        ChangeDetectorRef,
        { provide: Router, useValue: routerStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
