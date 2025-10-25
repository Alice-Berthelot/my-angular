import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'articles/all', component: ArticlesComponent },
    { path: 'articles/:id', component: ArticleDetailsComponent },
    { path: 'courses', component: CoursesComponent }
];
