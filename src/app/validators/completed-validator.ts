import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function completedValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const validValues = ["да", "нет", "даа", "неет","даaa", "неет","no", "yes"];
      const value = control.value;
      if (typeof value === "string" && validValues.includes(value.toLowerCase())) {
        return null; 
      }
      return { invalidCompleted: true }; 
    };
  }