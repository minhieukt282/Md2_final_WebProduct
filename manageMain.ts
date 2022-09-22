import {Product} from "./product";

export class ProductManage {
    static listProduct: Product[] = []
    countProduct: number = 0

    add(product: Product) {
        let flag = false
        ProductManage.listProduct.forEach((value)=>{
            if(value.id == product.id) flag = true
        })
        if (flag) console.log("Id already exists, please try again!")
        else {
            ProductManage.listProduct.push(product)
            this.countProduct++
            console.log("Add product done")
        }
    }

    delete(id: number): void {
        let index = ProductManage.findById(id)
        if (index != -1) {
            ProductManage.listProduct.splice(index, 1)
            this.countProduct--
            console.log("Delete done")
        } else console.log("Id not found ")
    }

    update(id: number, name?: string, quantity?: number, price?: number) {
        let index = ProductManage.findById(id)
        if (index != -1) {
            if (name) ProductManage.listProduct[index].name = name
            if (quantity) ProductManage.listProduct[index].quantity = quantity
            if (price) ProductManage.listProduct[index].price = price
            console.log("Update done")
        } else console.log("Id not found ")
    }

    static findById(id: number): number {
        let idx = -1
        ProductManage.listProduct.forEach((value, index) => {
            if (value.id == id) idx = index
        })
        return idx
    }

    findByName(name: string): Product[] | string | undefined {
        let listName: Product[] = []
        ProductManage.listProduct.forEach((value) => {
            if (value.name == name) listName.push(value)
        })
        if (listName.length != 0) return listName
        else console.log("Can not find name")
    }
}

export class ProductUser {
    yourStorage: Product[] = []
    countProduct: number = 0

    add(id: number, quantity: number) {
        let index: number = ProductManage.findById(id)
        if (index !=-1) {
            let product = new Product(id, ProductManage.listProduct[index].name, quantity, ProductManage.listProduct[index].price)
            if (quantity <= ProductManage.listProduct[index].quantity) {
                this.yourStorage.push(product)
                this.countProduct++
                console.log("Add done")
                ProductManage.listProduct[index].quantity -= product.quantity
            } else console.log("Not enough product in storage")
        }else console.log("Id not found, please try again")
    }

    delete(id: number) {
        let index = this.findById(id)
        if (index != -1) {
            this.yourStorage.splice(index, 1)
            this.countProduct--
            console.log("Delete done")
        } else console.log("Id not found ")
    }

    findById(id: number) {
        let idx = -1
        this.yourStorage.forEach((value, index) => {
            if (value.id == id) idx = index
        })
        return idx
    }

    showStorage() {
        return this.yourStorage
    }

    update(id: number, quantity: number) {
        let index = ProductManage.findById(id)
        let idxYourStorage = this.findById(id)
        if (idxYourStorage != -1) {
            ProductManage.listProduct[index].quantity += this.yourStorage[idxYourStorage].quantity - quantity
            this.yourStorage[idxYourStorage].quantity = quantity
            console.log("Update done")
        } else console.log("Id not found, please try again")
    }
}

export class StorageManage{
    listStorage: ProductManage[]=[]

    addStorage(value: ProductManage):void{
        this.listStorage.push(value)
    }

    removeStorage(storage_1: number, storage_2: number){
        let tempStorage: ProductManage
        tempStorage = this.listStorage[storage_1]
        this.listStorage[storage_1] = this.listStorage[storage_2]
        this.listStorage[storage_2]= tempStorage
    }
}