import {UserAccount} from "./account";


export class AccountManage {
    static listUser: UserAccount[] = []

    static addAccount(account: UserAccount) {
        this.listUser.push(account)
    }

    static checkAccount(user: string, password: string): boolean {
        let flag = false
        this.listUser.forEach((value) => {
            if (value.name == user && value.password == password)
                return flag = true
        })
        return flag
    }

    static checkLevel(user: string, password: string): number {
        let keycode: number = 1
        this.listUser.forEach(value => {
            if (value.name == user && value.password == password) keycode = value.level
        })
        return keycode

    }
}