import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const TranslateServiceStub = {
  setDefaultLang(lang: string): void {},
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
      providers:  [
        { provide: TranslateService, useValue:  TranslateServiceStub }
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  }));

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
