import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

const router = {
  navigateByUrl: jasmine.createSpy('navigate')
};

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers:  [
        ChangeDetectorRef,
        { provide: Router, useValue: router },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
