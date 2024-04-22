import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailValidator(control: AbstractControl): { [key: string]: any } | null {
  // Regular expression for email validation
  const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  // Check if the control's value matches the email pattern
  const valid = emailRegex.test(control.value);

  console.log("valid: ",valid)

  // Return validation result
  return valid ? null : { 'invalidEmail': true };
}
