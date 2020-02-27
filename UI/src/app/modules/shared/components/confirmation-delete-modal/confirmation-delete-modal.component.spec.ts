import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ConfirmationDeleteModalComponent } from './confirmation-delete-modal.component';

describe('ConfirmationDeleteModalComponent', () => {
  let component: ConfirmationDeleteModalComponent;
  let fixture: ComponentFixture<ConfirmationDeleteModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        ConfirmationDeleteModalComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDeleteModalComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('shouid emit output events with \'true\' value', () => {
    const comp = new ConfirmationDeleteModalComponent();
    spyOn(comp.userAction, 'emit');
    comp.onUsesAction(true);
    expect(comp.userAction.emit).toHaveBeenCalled();
  });

  it('shouid emit output events with \'false\' value', () => {
    const comp = new ConfirmationDeleteModalComponent();
    spyOn(comp.userAction, 'emit');
    comp.onUsesAction(false);
    expect(comp.userAction.emit).toHaveBeenCalled();
  });
});
