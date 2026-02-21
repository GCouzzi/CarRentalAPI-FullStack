import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthFormConfig, FormField } from '../auth.config';
import { passwordMatchValidator } from '../../validators/password-mismatch.validator';
import { cpfValidator } from '../../validators/cpf.validator';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth implements OnChanges {
  @Input() config!: AuthFormConfig;
  @Input() errorMessage: string = '';
  @Input() loading = false;
  @Input() sucessMessage: string = '';
  @Output() formSubmit = new EventEmitter<any>();
  form!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['config'] && this.config) {
      this.createForm();
    }
  }

  createForm() {
    const controls: { [key: string]: FormControl } = {};
    for (const field of this.config.fields) {
      controls[field.name] = new FormControl('', this.buildValidators(field));
    }
    if (this.config.showPasswordConfirmation) {
      controls['confirmPassword'] = new FormControl('', Validators.required);
      this.form = this.fb.group(controls, {
        validators: passwordMatchValidator,
      });
    } else {
      this.form = this.fb.group(controls);
    }
  }

  buildValidators(field: FormField): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    for (const validator of field.validators) {
      if (validator === 'required') {
        validators.push(Validators.required);
      } else if (validator.startsWith('minLength:')) {
        validators.push(
          Validators.minLength(parseInt(validator.split(':')[1], 10)),
        );
      } else if (validator.startsWith('maxLength:')) {
        validators.push(
          Validators.maxLength(parseInt(validator.split(':')[1], 10)),
        );
      } else if (validator.startsWith('pattern:')) {
        validators.push(Validators.pattern(validator.substring(8)));
      } else if (validator === 'cpf') {
        validators.push(cpfValidator());
      } else if (validator === 'email') {
        validators.push(Validators.email);
      }
    }
    return validators;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach((key) => {
        this.form.controls[key].markAsTouched();
      });
      return;
    }

    const formValue = { ...this.form.value };

    if (this.config.showPasswordConfirmation) {
      delete formValue.confirmPassword;
    }

    this.formSubmit.emit(formValue);
  }

  get Object() {
    return Object;
  }
}
