import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../auth.service';

describe('LoginComponent', () => {

    let component: LoginComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [MatFormFieldModule, MatInputModule, HttpClientTestingModule]
        })

       component = TestBed.createComponent(LoginComponent).componentInstance
    })

    it('El formulario debe ser invalido si los campos del mismo quedan en blanco', () => {
        component.emailControl.setValue('');
        component.passwordControl.setValue('');

        expect(component.loginForm.invalid).toBeTrue();
    })

    it('Al llamar login() y el formulario es invalido, se debe llamar al metodo markAllAsTouched de la propiedad loginForm', () => {
         component.emailControl.setValue('');
         component.passwordControl.setValue(''); 
         expect(component.loginForm.invalid).toBeTrue();
         const spyOfMarkAllAsTouched = spyOn(component.loginForm, 'markAllAsTouched');
         component.login()

       
       expect(spyOfMarkAllAsTouched).toHaveBeenCalled()
    })

    it('Al llamar login() y el formulario SI ES VALIDO, debe haberse llamado el metodo login() del authServise', () => {
        const authService = TestBed.inject(AuthService);
        component.emailControl.setValue('fake@mail.com');
        component.passwordControl.setValue('12345');
        expect(component.loginForm.valid).toBeTrue();
        const spyOnAuthService = spyOn(authService, 'login')
        component.login();
        expect(spyOnAuthService).toHaveBeenCalled();
    })
})