import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NotFoundPageComponent } from './not-found-page.component';

describe('NotFoundPageComponent', () => {
  let component: NotFoundPageComponent;
  let fixture: ComponentFixture<NotFoundPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NotFoundPageComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(NotFoundPageComponent);
    component = fixture.componentInstance;
  }));

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
