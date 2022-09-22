const fs = require('fs')

fs.readFile('./purchaseHistory.txt', 'utf8' , (err:any, data: string) => {
    if (err) {
        console.error(err)
        return
    }
    console.log(data)
})
const content = 'Some content!'

fs.writeFile('./purchaseHistory.txt', content, (err: any) => {
    if (err) {
        console.error(err)
        return
    }
})

