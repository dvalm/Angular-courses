import { CourseControlPanelComponent } from './course-control-panel.component';
import { ComponentFixture, TestBed, async, fakeAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('CourseControlPanelComponent', () => {
    let component: CourseControlPanelComponent;
    let fixture: ComponentFixture<CourseControlPanelComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          CourseControlPanelComponent
        ],
        imports: [
          FormsModule
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
      fixture.autoDetectChanges();
    });

    afterEach(() => {
      fixture.destroy();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('click search button and emit output events', () => {
      spyOn(component, 'search');
      const searchButton = fixture.nativeElement.querySelector('.search__button');
      searchButton.click();
      expect(component.search).toHaveBeenCalled();
    });

    it('should allow us to see a bound input field', fakeAsync(() => {
      const input = fixture.debugElement.query(By.css('.search__input')).nativeElement;
      input.value = 'new Value';
      input.dispatchEvent(new Event('input'));
      expect(component.searchText).toEqual('new Value');
    }));
});
