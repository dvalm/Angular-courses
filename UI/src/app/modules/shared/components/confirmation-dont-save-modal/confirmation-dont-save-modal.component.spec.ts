import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfirmationDontSaveModalComponent } from './confirmation-dont-save-modal.component';

describe('ConfirmationDontSaveModalComponent', () => {
  let component: ConfirmationDontSaveModalComponent;
  let fixture: ComponentFixture<ConfirmationDontSaveModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        ConfirmationDontSaveModalComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDontSaveModalComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('shouid emit output events with \'true\' value', () => {
    const comp = new ConfirmationDontSaveModalComponent();
    spyOn(comp.userAction, 'emit');
    comp.onUsesAction(true);
    expect(comp.userAction.emit).toHaveBeenCalled();
  });

  it('shouid emit output events with \'false\' value', () => {
    const comp = new ConfirmationDontSaveModalComponent();
    spyOn(comp.userAction, 'emit');
    comp.onUsesAction(false);
    expect(comp.userAction.emit).toHaveBeenCalled();
  });
});
