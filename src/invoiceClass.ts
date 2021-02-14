import {Customer} from './customerClass';

export class Invoice {
    ID: number;
    customer: Customer;
    details: string;
    amount: number;

    constructor(id: number, customer: Customer, amount: number, details: string) {
        this.ID = id;
        this.customer = customer;
        this.details = details;
        this.amount = amount;
    }
    getID(): number {
        return this.ID;
    }
    getCustomer(): Customer {
        return this.customer;
    }
    setCustomer(customer: Customer) {
        this.customer = customer;
    }
    getAmount(): number {
        return this.amount;
    }
    setAmount(amount: number) {
        this.amount = amount;
    }
    getCustomerName(): string {
        return this.customer.name;
    }
    getAmountAfterDiscount(): number {
        return +(this.amount - (this.amount * this.customer.getDiscount() / 100)).toFixed(2);
    }
}
