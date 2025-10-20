import { Injectable } from '@angular/core';
import { Course } from '../models/course';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  url = "http://localhost:3000/courses";
  constructor(private http: HttpClient) { }

  getCourses() : Observable<Course[]> {
    return this.http.get<Course[]>(this.url);
  }

  getCourseById(id: number) : Observable<Course> {
    return this.http.get<Course>(`${this.url}/${id}`);
  }

  deleteById(id: string) : Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  postCourse(course: Course) : Observable<any> {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(course);
    console.log(body);
    return this.http.post<any>(this.url, body, {'headers' : headers});
  }

  putCourse(course: Course) : Observable<any> {
    return this.http.put<any>(`${this.url}/${course.id}`, course);
  }
}
