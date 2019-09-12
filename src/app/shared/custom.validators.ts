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

    static annualAmountMinMax(){
        return (control: AbstractControl): { [key: string]: any } | null => {
            const annualAmount: any = control.value;
            if(annualAmount === '' || Number(annualAmount) <= 999.00 || Number(annualAmount) >= 10000001.00) {
                return null;
            } else {
                return { 'annualAmountMinMax': true};
            }
        }
    }

    static annualAmountMinMax1(control: FormControl):  any {
            let annualAmount: any = control.value;
            if(annualAmount === '') {
                
                return null;
                    
                
            } else if(Number(annualAmount) <= 999.00 || Number(annualAmount) >= 1000000001.00) {
                return {'annualAmountMinMax1': true}
            }
                
           
        }

    static compareAmountMinMax(control: FormControl):  any {
            let compareAmount: any = control.value;
            if(compareAmount === '') {                
                return null;             
                
            } else if(Number(compareAmount) >= 50001.00) {
                return {'compareAmountMinMax': true}
            }
                
           
        }

    static thirdAmountMinMax(control: FormControl):  any {
            let thirdAmount: any = control.value;
            if(thirdAmount === '') {                
                return null;             
                
            } else if(Number(thirdAmount) >= 100001.00) {
                return {'thirdAmountMinMax': true}
            }
                
           
        }
    
}
