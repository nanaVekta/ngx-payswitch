import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-ngx-theteller',
  template: `
    <form>
        <a class="ttlr_inline"
            [attr.data-APIKey]='apikey'
            [attr.data-transid]="transaction_id"
            [attr.data-amount]="amount"
            [attr.data-customer_email]="customer_email"
            [attr.data-currency]="(currency) ? currency : 'GHS'"
            [attr.data-redirect_url]="return_url"
            [attr.data-pay_button_text]="(button_text) ? button_text : 'Pay Now'"
            [attr.data-custom_description]="(description) ? description : ''"
            [attr.data-payment_method]="(payment_method) ? payment_method : 'both'">
        </a>
      </form>
  `,
  styles: [
  ]
})
export class NgxThetellerComponent implements OnInit {

  @Input() apikey!: string;
  @Input() transaction_id!: string;
  @Input() amount!: number;
  @Input() customer_email!: string;
  @Input() currency!: string;
  @Input() return_url!: string;
  @Input() button_text!: string;
  @Input() description!: string;
  @Input() payment_method!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
