import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  userName: string = 'example@example.com';
  userEmail!: string;
  userMessage!: string;

  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: [null],
      email: [null],
      message: [null],
    });
  }

  onSubmit() {
    console.log('userName: ', this.userName);
    console.log('userEmail: ', this.userEmail);
    console.log('userMessage: ', this.userMessage);
  }

  onSubmitForm(ngForm: NgForm) {
    console.log('Test template form: ', ngForm.value);
    console.log('Test email: ', ngForm.value.email);
  }

  onSubmitReactiveForm() {
    console.log('Test reactive form: ', this.contactForm.value);
  }
}
