# NgxTheteller

This library is meant to add payment integration for [theTeller](https://theteller.net/) by PaySwitch

## Installation

1. Run `npm i ngx-theteller` to install. 
2. Add the `NgxThetellerModule` to your AppModule imports
```
...
import { NgxThetellerModule } from 'ngx-theteller';

import { AppComponent } from './app.component';

@NgModule({
  ...
  imports: [
    NgxThetellerModule
  ],
  ...
})
export class AppModule { }
```
3. Add the js script to your `angular.json`
```
"scripts": [
  ...
  "node_modules/ngx-theteller/assets/js/payswitchProd.js"
  ...
  ]
```

## Usage

Add the `ngx-theteller` component to your page
```
<ngx-theteller
 [apikey]="'Your API Key'"
 [transaction_id]="'123456789098'"
 [amount]="1"
 [currency]="GHS"
 [customer_email]="'test@email.com'"
 [return_url]="'https://returnurl.com'"
 [custom_class]="'payment-button'"
 [description]="'Payment for vans sneaker'"
></ngx-theteller>
```
## Parameters

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| apikey | string | true | Your merchant API key provided when you create an account with [theTeller](https://theteller.net/) |
| --- | --- | --- | --- |
| transaction_id | string | true | A 12-digit unique transaction reference provided by you |
| --- | --- | --- | --- |
| amount | number | true | Amount to charge |
| --- | --- | --- | --- |
| customer_email | string | true | Customer's Email |
| --- | --- | --- | --- |
| currency | string | true | Currency to charge customer in. Defaults to GHS |
| --- | --- | --- | --- |
| return_url | string | true | URL to redirect to when transaction is completed |
| --- | --- | --- | --- |
| button_text | string | false | Text to show on payment button. Defaults to Pay Now | 
| --- | --- | --- | --- |
| description | string | true | Text to be displayed as a short transaction narration |
| --- | --- | --- | --- |
| payment_method | string | true | Choose between card or mobile money payment.
e.g card, momo, both. Defaults to both |
| --- | --- | --- | --- |
| custom_class | string | --- | false | A custom class to style payment button |

## Contributing

Please feel free to fork this package and contribute by submitting a pull request to enhance the functionalities.

Two projects exist in this repository

 - The ngx-theteller package: ./projects/ngx-theteller
 - The demo: ./projects/testing

## Demo
- Run `ng build ngx-theteller`
- Run `ng serve`

### Thanks to [Julius Asante](https://juliusasante.com)
## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
