import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, take, Subject, map } from 'rxjs';
import { CreateCourseData, Course, UpdateCourseData } from './models';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const COURSES_DB: Observable<Course[]> = of([
  {
    id: 1,
    name: 'Angular',
    description: 'Angular es un framework para aplicaciones web desarrollado en TypeScript, de código abierto, mantenido por Google, que se utiliza para crear y mantener aplicaciones web de una sola página.',
    courseCode: 2016,
    categoryId: 1
  },
  {
    id: 2,
    name: 'C++',
    description: 'C++ es un lenguaje de programación diseñado en 1979 por Bjarne Stroustrup. La intención de su creación fue extender al lenguaje de programación C y añadir mecanismos que permiten la manipulación de objetos. En ese sentido, desde el punto de vista de los lenguajes orientados a objetos, C++ es un lenguaje híbrido. ',
    courseCode: 1979,
    categoryId: 1

  },
  {
    id: 3,
    name: 'Java',
    description: 'Java es un lenguaje de programación y una plataforma informática que fue comercializada por primera vez en 1995 por Sun Microsystems.',
    courseCode: 1995,
    categoryId: 2

  },
])

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private _courses$ = new BehaviorSubject<Course[]>([]);
  public courses$ = this._courses$.asObservable();

  private sendNotifications$ = new Subject<string>();

  constructor(private http: HttpClient) {
    this.sendNotifications$.subscribe({
      next: (message) =>
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500
      }),
    });
  }

  sendNotification(notification: string): void{
    this.sendNotifications$.next(notification);
  }

  loadCourses(): void {
    COURSES_DB.subscribe({
      next: (courseFromDb) => this._courses$.next(courseFromDb)
    });
  }

  getCourses(): Subject<Course[]> {
    return this._courses$;
  }

  getCoursesbyId(id: number): Observable<Course | undefined> {
    return this.courses$.pipe(
      map((courses) => courses.find((c) => c.id === id)),
      take(1),
    )
  }

  createCourse(course: CreateCourseData): void {
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._courses$.next([
          ...arrayActual,
          {...course, id: arrayActual.length + 1},
        ]);
      },
    });
  }

  updateCourseById(id: number, updatedCourse: UpdateCourseData): void {
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._courses$.next(
          arrayActual.map((course) => course.id === id? {...course, ...updatedCourse} : course)
        );
      },
    })
  }

  deleteCourse(id: number): void{
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._courses$.next(
          arrayActual.filter((course) => course.id !== id));
      }
    })
  }

  getCourseByCategoryId(categoryId: number): Observable<Course[]> {
    return this.http.get<Course[]>(environment.baseApiUrl + `/courses?categoryId=${categoryId}`)
  }
}
