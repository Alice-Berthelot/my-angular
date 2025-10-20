import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { Article } from '../models/article';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.css',
})
export class ArticleDetailsComponent implements OnInit {
  @Input() articleDetails!: string;
  article!: Article;
  @Output() details: EventEmitter<string>  = new EventEmitter<string>();

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.articlesService
      .getArticleById(this.route.snapshot.params['id'])
      .subscribe((article: Article) => {
        this.article = article;
      });
  }

  sendDetails() {
    this.details.emit("essai output details");
  }
  
}

