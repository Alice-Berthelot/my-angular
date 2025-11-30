import { Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleDetailsComponent } from './article-details/article-details.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ArticleFormComponent } from './article-form/article-form.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'articles', component: ArticlesComponent },
    { path: 'articles/form', component: ArticleFormComponent },
    { path: 'articles/:id', component: ArticleDetailsComponent },
    { path: 'courses', component: CoursesComponent },
    { path: 'contact', component: ContactComponent}
];
