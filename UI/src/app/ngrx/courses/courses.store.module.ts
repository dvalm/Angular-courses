import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { COURSES_REDUSER_NODE, coursesReduser } from './courses.reduser';
import { CoursesEffects } from './courses.effect';

@NgModule({
    imports: [
        StoreModule.forFeature(COURSES_REDUSER_NODE, coursesReduser),
        EffectsModule.forFeature([CoursesEffects]),
    ],
})
export class CoursesStoreModule {}
