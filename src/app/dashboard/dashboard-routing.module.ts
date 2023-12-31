import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { adminGuard } from '../core/guards/admin.guard';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'home',
                component: HomeComponent,
            },
            {
                path: 'users',
                canActivate: [adminGuard],
                loadChildren: () => import('./pages/users/users.module').then((typescriptModule) => typescriptModule.UsersModule)
            },
            {
                path: 'students',
                loadChildren: () => import('./pages/students/students.module').then((typescriptModule) => typescriptModule.StudentsModule)
            },
            {
                path: 'courses',
                loadChildren: () => import('./pages/courses/courses.module').then((typescriptModule) => typescriptModule.CoursesModule)
            },
            {
                path: 'inscriptions',
                loadChildren: () => import('./pages/inscriptions/inscriptions.module').then((typescriptModule) => typescriptModule.InscriptionsModule)
            },
            {
                path: 'categories',
                loadChildren: () => import('./pages/categories/categories.module').then((typescriptModule) => typescriptModule.CategoriesModule)
            },
            {
                path: '**',
                component: NotFoundComponent,
            },
        ]),
    ],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}