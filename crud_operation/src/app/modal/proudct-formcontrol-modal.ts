import { FormControl } from "@angular/forms";

export interface ProductFormGroup {
    productName:FormControl<null | string>;
    productCategory:FormControl<null | string>;
    productPrice:FormControl<null | number>;
}