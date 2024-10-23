import { Directive, ElementRef, HostBinding, Input, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Directive({
  selector: '[passwordRequirement]',
  standalone: true
})
export class PasswordRequirementDirective implements OnInit {

  constructor(private ref: ElementRef, private renderer: Renderer2) { }
  @Input('passwordRequirement') config!: {control: AbstractControl, requirement: string, requirement2?: string}
  @HostBinding('style.color') textColor: string = 'black'


  ngOnInit(): void {
    this.config.control.valueChanges.subscribe(value => {
      this.checkRequirement(value);
    });

  }

  private checkRequirement(value:string): void {
    if (this.config.control.touched || this.config.control.dirty)
    {
      
      if(!this.config.control.errors)
      {
        switch (this.config.requirement)
        {
          case 'minLength':
            if (value.length < 8) 
            {
              this.textColor = 'red';
            } else
            {
              this.textColor = 'green';
            }
            break;
          case 'hasUppercase':
            
            break;
          case 'hasLowercase':
            break;
          case 'hasNumber':
            break;
          case 'hasSpecialChar':
            break;
          default:
            this.textColor='red'
        }
      }
      else
      {
        this.textColor = 'red';
      }
      
    }
    else{
      this.textColor = 'black'
    }
    
  }

}


// get hasUpperCase(): boolean {
//   return /[A-Z]/.test(this.passwd.value || '');
// }

// get hasLowerCase(): boolean {
//   return /[a-z]/.test(this.passwd.value || '');
// }

// get hasSpecialChar(): boolean {
//   return /[\W\_]/.test(this.passwd.value || '');
// }

// get hasNumber(): boolean {
//   return /[\d]/.test(this.passwd.value || '');
// }