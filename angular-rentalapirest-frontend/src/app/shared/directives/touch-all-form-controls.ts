import { Directive, HostListener, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[appTouchAllFormControls]',
  standalone: false
})
export class TouchAllFormControls {

  constructor() { }
  @Input('appTouchAllFormControls') form!: FormGroup;

  @HostListener('click')
  onClick(): void {
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].markAsTouched();
    });
  }
}
