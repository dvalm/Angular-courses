import {
  Component, ChangeDetectionStrategy, Input, Attribute, OnInit, forwardRef,
  ViewChild, ElementRef, ChangeDetectorRef
} from '@angular/core';
import { FormGroup, ControlValueAccessor, Validators, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { Author } from '../../../models/author';
import { CoursesService } from '../../../services/courses.service';
import { TNullable } from '../../../types/nullable.type';

export function validateAuthors(formControl: FormControl): TNullable<object> {
  const value: Author[] = formControl.value;
  const err = {
    error: {
      given: value,
      farmat: 'There should be no duplicate authors'
    }
  };
  return hasDuplicate(value) ? err : null;
}

function hasDuplicate(arrayToCheck: Author[]): boolean {
  let duplicate = false;
  arrayToCheck.forEach((author: Author, authorIndex: number) => {
    arrayToCheck.forEach((item: Author, itemIndex: number) => {
      if (author.firstName === item.firstName &&
        author.lastName === item.lastName && authorIndex !== itemIndex) {
        duplicate = true;
      }
    });
  });
  return duplicate;
}

@Component({
  selector: 'app-course-authors',
  templateUrl: './course-authors.component.html',
  styleUrls: ['./course-authors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CourseAuthorsComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useValue: validateAuthors,
      multi: true
    }
  ]
})
export class CourseAuthorsComponent implements ControlValueAccessor, OnInit {

  @Input() parentForm: FormGroup;
  @ViewChild('newAuthor', { static: false }) newAuthor: ElementRef;

  public searchAuthors: Author[] = [];
  public _isInputVisible: boolean;
  public set isInputVisible(value: boolean) {
    this._isInputVisible = value;
  }

  public get isInputVisible(): boolean {
    return this.authors.length === 0 || this._isInputVisible;
  }

  constructor(@Attribute('formControlName') public _formControlName: string,
    private coursesService: CoursesService,
    private changeDetectorRef: ChangeDetectorRef) { }

  private _authors: Author[];
  public set authors(authors: Author[]) {
    this._authors = authors;
    this.onChange(this.authors);
  }
  public get authors(): Author[] {
    return this._authors;
  }

  public ngOnInit(): void {
    this.parentForm.get(this._formControlName).setValidators([validateAuthors]);
  }

  public writeValue(authors: Author[]): void {
    this.authors = authors;
  }
  /* tslint:disable */
  public registerOnChange(fn: any): void {
    /* tslint:enable */
    this.onChange = fn;
  }
  /* tslint:disable */
  public registerOnTouched(fn: any): void {
    /* tslint:enable */
    this.onTouche = fn;
  }

  public deleteAuthor(index: number): void {
    this.authors = this.authors.filter((item: Author, itemIndex: number) => itemIndex !== index);
    this.isInputVisible = false;
  }

  public createAuthor(event: Event): void {
    const [firstName, lastName]: string[] = (event.target as HTMLInputElement).value.split(' ');
    (event.target as HTMLInputElement).value = '';
    this.authors = [...this.authors, new Author(undefined, firstName, lastName)];
  }

  public createSearchAuthor(author: Author): void {
    this.newAuthor.nativeElement.value = '';
    const updateAuthors = this.authors.slice();
    updateAuthors[updateAuthors.length] = author;
    this.authors = updateAuthors;
    this.searchAuthors = [];
  }

  public updateAuthor(index: number): void {
    const author = this.authors[index];
    this.deleteAuthor(index);
    this.isInputVisible = true;
    this.newAuthor.nativeElement.value = `${author.firstName} ${author.lastName}`;
    setTimeout(() => this.newAuthor.nativeElement.focus(), 0);
  }

  public inputAuthor(event: Event): void {
    this.coursesService.searchAuthors((event.target as HTMLInputElement).value).subscribe(
      (authors: Author[]) => {
        this.searchAuthors = authors;
        this.changeDetectorRef.markForCheck();
      }
    );
  }

  public isAuthorDuplicate(author: Author, index: number): boolean {
    return this.authors.some(
      (itemAuthor: Author, itemIndex: number) => author.firstName === itemAuthor.firstName &&
        author.lastName === itemAuthor.lastName && index !== itemIndex
    );
  }

  public makeInputVisible(event: Event): void {
    if ((event.target as HTMLInputElement).classList.contains('course-authors__all-authors')) {
      this.isInputVisible = true;
      setTimeout(() => this.newAuthor.nativeElement.focus(), 0);
    }
  }
  /* tslint:disable */
  private onChange = (_: any) => { };

  private onTouche: any = () => { };
  /* tslint:enable */
}
