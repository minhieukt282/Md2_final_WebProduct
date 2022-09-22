const GATE_1 = 1
const GATE_2 = 2
const GATE_3 = 3

export class UserAccount{
    private _name: string
    private _password: string
    private _level: number = GATE_1
    constructor(name: string, password: string) {
        this._name = name;
        this._password = password;
    }

    get name(): string {
        return this._name;
    }

    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }
}

// export class AdminAccount extends UserAccount{
//     private _status: boolean
//
//     constructor(name: string, password: string, status: boolean,key:number = 2) {
//         super(name, password);
//         this._status = status;
//         this._level = key
//     }
//
//     set status(value: boolean){
//         this._status = value
//     }
//     checkKey(){
//         console.log(this._level)
//     }
//     setKey(key:number){
//         this._level = key
//     }
//
// }
// let user = new AdminAccount('123','1234',true)
// console.log(user)
// export class PresidentAccount extends AdminAccount{
//
//     constructor(name: string, password: string, status: boolean) {
//         super(name, password, status);
//     }
// }