export class Customer {
    ID: number;
    name: string;
    discount: number;

    constructor(ID: number, name: string, discount: number) {
        this.ID = ID;
        this.name = name;
        this.discount = discount;
    }

    getID(): number {
        return this.ID;
    }
    getName(): string {
        return this.name;
    }
    getDiscount(): number {
        return this.discount;
    }
    setDiscount(discount: number) {
        this.discount = discount;
    }
}