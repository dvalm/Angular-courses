import { CourseControlPanelComponent } from './course-control-panel.component';
import { ComponentFixture, TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CourseControlPanelComponent', () => {
    let component: CourseControlPanelComponent;
    let fixture: ComponentFixture<CourseControlPanelComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
            CourseControlPanelComponent
        ],
        schemas: [
          NO_ERRORS_SCHEMA
        ],
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(CourseControlPanelComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('click search button and emit output events', () => {
        const comp = new CourseControlPanelComponent();
        spyOn(comp.changeSearchText, 'emit');
        const searchButton = fixture.nativeElement.querySelector('.search__button');
        searchButton.click();
        expect(comp.changeSearchText.emit).not.toHaveBeenCalled();
    });
});
