import { TestBed, async, getTestBed, ComponentFixture } from '@angular/core/testing';
import { ModalService } from './modal.service';
import { ApplicationRef, Injector, ComponentFactoryResolver, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ModalService', () => {
  let injector: TestBed;
  let service: ModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers:  [
        ModalService,
        ApplicationRef,
        Injector,
        ComponentFactoryResolver,
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    injector = getTestBed();
    service = injector.get(ModalService);
  });
});
