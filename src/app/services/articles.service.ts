import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  url = "http://localhost:3000/articles";

  constructor(private http: HttpClient) { }

  getArticles() : Observable<Article[]> {
    return this.http.get<Article[]>(this.url);
  }

  getArticleById(id: string) : Observable<Article> {
    return this.http.get<Article>(`${this.url}/${id}`);
  }

  deleteArticleById(id: string) : Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  postArticle(article: Article) : Observable<any> {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(article);
    console.log(body);
    return this.http.post<any>(this.url, body, {'headers' : headers});
  }

  putArticle(article: Article) : Observable<any> {
    return this.http.put<any>(`${this.url}/${article.id}`, article);
  }
}
