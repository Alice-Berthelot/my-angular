import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article';
import { ArticlesService } from '../services/articles.service';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticleDetailsComponent } from '../article-details/article-details.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ArticleDetailsComponent, TitleCasePipe],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css',
})
export class ArticlesComponent implements OnInit {
  articles!: Article[];
  sortedArticles!: Article[];
  bestArticle!: Article;
  article!: Article;
  articleToAdd!: Article;
  articleToUpdate!: Article;
  inputValue!: string;
  details!: string;
  isDetailed!: boolean;
  detailedArticleId!: string;
  articleWithNewPoints!: Article;
  filter!: string;

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.articlesService.getArticles().subscribe((articles: Article[]) => {
      this.articles = articles;
      this.sortedArticles = this.articles.sort((a, b) => b.points - a.points);
    });
    this.articlesService.getArticleById('100').subscribe((article: Article) => {
      this.bestArticle = article;
    });
    this.articleToAdd = new Article('', '', '', '', 0);
    this.inputValue = '';
    this.isDetailed = false;
    this.detailedArticleId = '';
    this.articleWithNewPoints = new Article('', '', '', '', 0);
    this.filter = "";
  }

  showDetails(id: string) {
    if (this.detailedArticleId === id) {
      this.detailedArticleId = '';
    } else {
      this.detailedArticleId = id;
    }
    this.articlesService.getArticleById(id).subscribe((article: Article) => {
      this.article = article;
      this.details = article.details;
    });
  }

  matchInputValue(article: Article): boolean {
    let searchValue = this.inputValue.toLowerCase();
    if (!searchValue) {
      return true;
    } else {
      return (
        article.title.toLowerCase().includes(searchValue) ||
        article.author.toLowerCase().includes(searchValue)
      );
    }
  }

  deleteArticle(id: string): void {
    this.articlesService.deleteArticleById(id).subscribe();
  }

  addArticle(): void {
    this.articlesService.postArticle(this.articleToAdd).subscribe();
  }

  addPoints(articleWithNewPoints: Article): void {
    this.articleWithNewPoints = articleWithNewPoints;
    this.articleWithNewPoints.points += 1;
    this.articlesService.putArticle(this.articleWithNewPoints).subscribe();
  }

  reset(articleId: string): void {
    const articleToReset = this.articles.find(article => article.id == articleId);
    if (!articleToReset) return;
    articleToReset.points = 0;
    this.articlesService.putArticle(articleToReset).subscribe();
  }

  noFilter(): void {
    this.filter = "";
  }

  filterByFivePoints(): void {
    this.filter = "5";
  }

  filterByThreePoints(): void {
    this.filter = "3";
  }

  displayFilteredArticles(article?: Article): boolean {
    if (!this.filter) {
      return true;
    } else if (article?.points == parseInt(this.filter)) {
      return true;
    } else {
      return false;
    }
  }

  handleDetails(details: string) {
    console.log(details);
  }
}
