import {AccountManage} from "./accountManage";
import {UserAccount} from "./account";
import {ProductManage, ProductUser} from "./manageMain";
import {Product} from "./product";
import {ReadWriteFile} from "./readWriteFile";

let today = new Date();
let date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
let time = today.getHours() + ':' + today.getMinutes();
let dateTime = time + ' - ' + date;

let input = require('readline-sync');
let file = new ReadWriteFile()
let backUpData: string

let productUser = new ProductUser()
let productManager = new ProductManage()

let pro1 = new Product(1, "car", 40, 520)
let pro2 = new Product(2, "ship", 40, 480)
let pro3 = new Product(3, "train", 40, 3120)
let pro4 = new Product(4, "board", 40, 2556)
let pro5 = new Product(5, "air plane", 40, 4282)

productManager.add(pro1)
productManager.add(pro2)
productManager.add(pro3)
productManager.add(pro4)
productManager.add(pro5)

let pr = new UserAccount("a", "1")
pr.level = 3
AccountManage.addAccount(pr)
let admin = new UserAccount("ad", "1")
admin.level = 2
AccountManage.addAccount(admin)
let user = new UserAccount("1", "1")
AccountManage.addAccount(user)
console.log(AccountManage.listUser)

// init()

function init() {
    let choice: number
    let info = `----WELCOME----
    1.Login
    2.Register`
    do {
        console.log(info)
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                login()
                break
            case 2:
                register()
                break
        }
    } while (choice != -1)
}

function login() {
    let info = `-----LOGIN-----`
    console.log(info)
    let user = input.question("User Name: ")
    let password = input.question("Password: ")
    if (AccountManage.checkAccount(user, password)) {
        switch (AccountManage.checkLevel(user, password)) {
            case 1:
                startUser()
                break
            case 2:
                startManager()
                break
            case 3:
                startPresident()
                break
        }
    } else console.log("User or password is incorrect. Please try again")
}

function register() {
    let info = `-----REGISTER-----`
    console.log(info)
    let user = input.question("User name: ")
    let password = input.question("Password: ")
    let account = new UserAccount(user, password)
    AccountManage.addAccount(account)
    console.log("Sign up success")
    console.log(AccountManage.listUser)
}

//------------------------------------------
startUser()

function startUser() {
    let choice: number
    let info = `-----WELCOME TO MARKET-----
    1. Show your storage
    2. Add product to storage
    3. Edit product
    4. Purchase
    5. Purchase history
    0. Log out`
    console.log(info)
    console.log(ProductManage.listProduct)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                userShowStorage()
                break
            case 2:
                userAddProduct()
                break
            case 3:
                userUpdateProduct()
                break
            case 4:
                userPurchase()
                break
            case 5:
                userHistory()
                break
            case 0:
                init()
                break
        }
    } while (choice != -1)
}

function userHistory() {
    let choice: number
    let info = `-----PURCHASE HISTORY-----
    0. Back to menu`
    console.log(info)
    console.log(file.readFile())
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 0:
                startUser()
                break
        }
    } while (choice != -1)
}

function userShowStorage() {
    let choice: number
    let info = `-----YOUR STORAGE-----
    1. Buy all
    2. Edit product
    3. Delete Product
    0. Back to menu`
    console.log(info)
    console.log("Number of products in storage: " + productUser.countProduct)
    console.log(productUser.showStorage())
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                userPurchase()
                break
            case 2:
                userUpdateProduct()
                break
            case 3:
                userDeleteProduct()
                break
            case 0:
                startUser()
                break
        }
    } while (choice != -1)
}

function userAddProduct() {
    let choice: number
    let info = `-----ADD PRODUCT-----
    1. Continue
    2. Show your storage update
    3. Edit product
    4. Buy all
    0. Back to menu`
    console.log(info)
    let id = +input.question("Id: ")
    let quantity = +input.question("Quantity: ")
    productUser.add(id, quantity)

    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                userAddProduct()
                break
            case 2:
                userShowStorage()
                break
            case 3:
                userUpdateProduct()
                break
            case 4:
                userPurchase()
                break
            case 0:
                startUser()
                break
        }
    } while (choice != -1)
}

function userPurchase() {
    let total = 0
    productUser.yourStorage.forEach(value => {
        total += value.price * value.quantity
    })
    let choice: number
    let info_1 = `-----PAYING PRODUCT-----
    Time: ${dateTime}
    Total product: ${productUser.countProduct}
    Total price: ${total}$`
    let info_2 = `---------------------------------
    1. Purchase
    0. Cancel/Back to menu`
    console.log(info_1)
    console.log(productUser.showStorage())
    console.log(info_2)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                donePurchase()
                break
            case 0:
                startUser()
                break
        }
    } while (choice != -1)
}

function donePurchase() {
    let content: string
    let total = 0
    productUser.yourStorage.forEach(value => {
        total += value.price * value.quantity
    })
    let info_1 = `-----THANK YOU FOR PURCHASE-----`
    let info_2 = `Time: ${dateTime}
    Total product: ${productUser.countProduct}
    Total price: ${total}$`
    let info_3 = `You will be back to menu screen in 3 seconds`
    console.log(info_1)
    console.log(info_3)
    backUpData = file.readFile() + "\n"
    content = backUpData + info_2
    file.writeFile(content)
    startUser()
}

function userUpdateProduct() {
    let choice: number
    let info = `-----UPDATE PRODUCT-----
    1. Continue
    2. Show your storage update
    3. Delete product
    0. Back to menu`
    console.log(info)
    console.log("Number of products in storage: " + productUser.countProduct)
    console.log(productUser.showStorage())
    let id = +input.question("Id: ")
    let quantity = +input.question("Quantity update: ")
    productUser.update(id, quantity)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                userUpdateProduct()
                break
            case 2:
                userShowStorage()
                break
            case 3:
                userDeleteProduct()
                break
            case 0:
                startUser()
                break
        }
    } while (choice != -1)
}

function userDeleteProduct() {
    let choice: number
    let info = `-----DELETE PRODUCT-----
    1. Continue
    0. Back to menu`
    console.log(info)
    let id = +input.question("id: ")
    productUser.delete(id)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                userDeleteProduct()
                break
            case 0:
                startUser()
                break
        }
    } while (choice != -1)
}

//------------------------------------------

function startManager() {
    let info_1 = `-----GOOD MORNING MANAGER-----`
    let info_2 = `-----HAVE A NINE DAY MANAGER-----`
    let info_3 = `-----GOOD NIGHT MANAGER-----`
    let info_4
    let time = today.getSeconds()
    if (time < 20 && time > 0) info_4 = info_1
    else if (time < 40 && time >= 20) info_4 = info_2
    else info_4 = info_3
    console.log(time)
    let choice: number
    let info = `${info_4}
    1. Show product
    2. Add product
    3. Edit product
    4. Delete Product
    0. Logout`
    console.log(info)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                showProduct()
                break
            case 2:
                addProduct()
                break
            case 3:
                updateProduct()
                break
            case 4:
                deleteProduct()
                break
            case 0:
                init()
                break
        }
    } while (choice != -1)
}

function showProduct() {
    let choice: number
    let info = `-----PRODUCT STORAGE-----
    0. Back to menu`
    console.log(info)
    console.log("Number of products in storage: " + productManager.countProduct)
    console.log(ProductManage.listProduct)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 0:
                startManager()
                break
        }
    } while (choice != -1)
}

function addProduct() {
    let choice: number
    let info = `-----ADD PRODUCT-----
    1. Continue
    2. Show product
    0. Back to menu`
    console.log(info)
    let id = +input.question("id: ")
    let name = input.question("Name: ")
    let quantity = +input.question("Quantity: ")
    let price = +input.question("Price: ")
    let newProduct = new Product(id, name, quantity, price)
    productManager.add(newProduct)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                addProduct()
                break
            case 2:
                showProduct()
                break
            case 0:
                startManager()
                break
        }
    } while (choice != -1)

}

function updateProduct() {
    let choice: number
    let info = `-----UPDATE PRODUCT-----
    1. Continue
    2. Show product update
    3. Delete product
    0. Back to menu`
    console.log(info)
    let id = +input.question("id: ")
    let name = input.question("Name update: ")
    let quantity = +input.question("Quantity update: ")
    let price = +input.question("Price update: ")
    productManager.update(id, name, quantity, price)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                updateProduct()
                break
            case 2:
                showProduct()
                break
            case 3:
                deleteProduct()
                break
            case 0:
                startManager()
                break
        }
    } while (choice != -1)
}

function deleteProduct() {
    let choice: number
    let info = `-----DELETE PRODUCT-----
    1. Continue
    2. Show product update
    0. Back to menu`
    console.log(info)
    let id = +input.question("id: ")
    productManager.delete(id)

    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                deleteProduct()
                break
            case 2:
                showProduct()
                break
            case 0:
                startManager()
                break
        }
    } while (choice != -1)
}

//------------------------------------------
function startPresident() {
    let choice: number
    let info = `-----HELLO PRESIDENT-----`
    console.log(info)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                console.log("k")
                break
            case 2:
                console.log("h")
                break
        }
    } while (choice != -1)
}
