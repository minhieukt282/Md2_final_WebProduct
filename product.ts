export class Product{
    private _id: number
    private _name: string
    private _quantity: number
    private _price: number

    constructor(id: number, name: string, quantity: number, price: number) {
        this._id = id
        this._name = name;
        this._quantity = quantity;
        this._price = price;
    }

    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get quantity(): number {
        return this._quantity;
    }

    set quantity(value: number) {
        this._quantity = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }
}
