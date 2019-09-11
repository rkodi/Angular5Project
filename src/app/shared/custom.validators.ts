import { AbstractControl, FormControl } from '@angular/forms';

export class CustomValidators {
    static emailDomain(domainName: string) {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const email: string = control.value;
            const domain = email.substring(email.lastIndexOf('@') + 1);
            if (email === '' || domain.toLowerCase() === domainName.toLocaleLowerCase()) {
                return null;
            } else {
                return { 'emailDomain': true };
            }
        };
    }

    static annualCreditCardSalesMinMax(){
        return (control: AbstractControl): { [key: string]: any } | null => {
            const annualCreditCardSales: any = control.value;
            if(annualCreditCardSales === '' || Number(annualCreditCardSales) <= 999.00 || Number(annualCreditCardSales) >= 10000001.00) {
                return null;
            } else {
                return { 'annualCreditCardSalesMinMax': true};
            }
        }
    }

    static annualCreditCardSalesMinMax1(control: FormControl):  any {
            let annualCreditCardSales: any = control.value;
            if(annualCreditCardSales === '') {
                
                return null;
                    
                
            } else if(Number(annualCreditCardSales) <= 999.00 || Number(annualCreditCardSales) >= 1000000001.00) {
                return {'annualCreditCardSalesMinMax1': true}
            }
                
           
        }

    static typicalSalesAmountMinMax(control: FormControl):  any {
            let typicalSalesAmount: any = control.value;
            if(typicalSalesAmount === '') {                
                return null;             
                
            } else if(Number(typicalSalesAmount) >= 50001.00) {
                return {'typicalSalesAmountMinMax': true}
            }
                
           
        }

    static anticipatedHighestTicketMinMax(control: FormControl):  any {
            let anticipatedHighestTicket: any = control.value;
            if(anticipatedHighestTicket === '') {                
                return null;             
                
            } else if(Number(anticipatedHighestTicket) >= 1000001.00) {
                return {'anticipatedHighestTicketMinMax': true}
            }
                
           
        }
    
}
