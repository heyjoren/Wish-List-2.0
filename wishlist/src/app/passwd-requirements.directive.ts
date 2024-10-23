import { Directive, HostBinding, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appPasswdRequirements]',
  standalone: true
})
export class PasswdRequirementsDirective {

  constructor() { }

  @Input('appPasswdRequirements') config!: {control: AbstractControl, requirement: string}
  @HostBinding('style.color') textColor: string = 'black';

  ngOnInit(): void {
    this.config.control.valueChanges.subscribe(value => {
      this.checkRequirement(value);  
    })
  }

  private checkRequirement(value: string): void
  {
    switch (this.config.requirement)
    {
      case 'minlength':
            if (value.length < 8) 
            {
              this.textColor = 'red';
            } else
            {
              this.textColor = 'green';
            }
            break;
          case 'hasUppercaseAndLower':
            if (value.match(/[a-z]/) && value.match(/[A-Z]/)) {
              this.textColor = 'green';
            }
            else{
              this.textColor = 'red';
            }
            break;
          case 'hasNumber':
            if(/[\d]/.test(value))
            {
              this.textColor = 'green';
            }
            else {
              this.textColor = 'red';
            }
            break;
          case 'hasSpecialChar':
            if(/[\W\_]/.test(value))
            {
              this.textColor = 'green';
            }
            else {
              this.textColor = 'red';
            }
            break;
          default:
            this.textColor='black'
    }
  }

}