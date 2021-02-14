import {Customer} from './customerClass';

export class Account {
    ID: number;
    customer: Customer;
    balance: number = 0.0;

    constructor(id: number, customer: Customer, balance?: number) {
        this.ID = id;
        this.customer = customer;
        if (balance !== undefined)
            this.balance = balance;
    }

    getID(): number {
        return this.ID;
    }
    getCustomer(): Customer {
        return this.customer;
    }
    getBalance(): number {
        return this.balance;
    }
    setBalance(balance: number) {
        this.balance = +balance.toFixed(2);
    }
    toString() {
        return `${this.getCustomerName()}(${this.ID}) balance=$${this.balance}`;
    }
    getCustomerName(): string {
        return this.customer.getName();
    }
    deposit(amount: number): Account {
        this.balance += amount;
        
        return this;
    }
    withdraw(amount: number): boolean {
        if (this.balance >= amount) {
            this.balance -= amount;
           
            return true;
        } else {
            
            return false;
        }
    }

    
}
