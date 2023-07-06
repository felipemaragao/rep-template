import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validate-message',
  template: `
  <div *ngIf="validateIsErro()"
     class="ui-message ui-message-error"> {{messageError}}
  </div>
  `,
  styles: [`
    .ui-messages-error {
      margin: 0;
      margin-top: 4px;
    }
  `]
})
export class ValidateMessageComponent {

   @Input() error!: string;
   @Input() control!: FormControl;
   @Input() messageError!: string;

   validateIsErro(): boolean {
     return this.control.hasError(this.error) && this.control.dirty;
   }


}
