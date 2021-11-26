import {Component, HostBinding, Input, OnInit} from '@angular/core';
import {AbstractControl} from "@angular/forms";

@Component({
  selector: 'ba-validation-info',
  templateUrl: './validation-info.component.html'
})
export class ValidationInfoComponent  {
 @Input()
 control!: AbstractControl;

 @HostBinding('class.invalid-feedback')
 invalidFeedback = true;

}
