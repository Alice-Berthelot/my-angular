import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Article } from '../models/article';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.css'
})
export class ArticleFormComponent {

  articleForm!: FormGroup;
  articlePreview$!: Observable<Article>;

  constructor(private formBuilder: FormBuilder, private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.articleForm = this.formBuilder.group({
      id: [null, [Validators.required]],
      title: [null, [Validators.required]],
      author: [null, [Validators.required]],
      details: [null]
    });
    this.articlePreview$ = this.articleForm.valueChanges.pipe(
      map(formValue => ({
          ...formValue,
          points: 0
      })));
  }

  addArticle(): void {
      this.articlesService.postArticle(this.articleForm.value).subscribe();
  }
}
