import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Course } from '../models/course';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent implements OnInit {
  courses!: Course[];
  course!: Course;
  title!: string;
  courseToAdd!: Course;
  courseModified!: Course;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.title = 'Mes cours';
    this.courseService.getCourses().subscribe((courses: Course[]) => {
      this.courses = courses;
    });
    this.courseService.getCourseById(2).subscribe((course: Course) => {
      this.course = course;
    });
    this.courseToAdd = {
      "id": "7",
      "name": "Nouveau cours",
      "description": "Cours de nouveau cours",
      "ects": "4"
    };
    this.courseModified = {
      "id": "2",
      "name": "Anglais",
      "description": "Cours d'anglais'",
      "ects": "10"
    };
  }
  
  deleteCourse(id: string): void {
    this.courseService.deleteById(id).subscribe((course: Course) => {
      this.course = course;
    });
  }

  addCourse(): void {
    this.courseService.postCourse(this.courseToAdd).subscribe();
  }

  putCourse(): void {
    this.courseService.putCourse(this.courseModified).subscribe();
  }
  
  getTitle() {
    return this.title;
  }

  author: string = 'Auteur';

  updateTitle() {
    return (this.title = 'nouveau titre');
  }
}
