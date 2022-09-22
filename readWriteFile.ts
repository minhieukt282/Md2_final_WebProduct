export class ReadWriteFile {
    fs = require('fs')

    readFile() {
        let data = this.fs.readFileSync('./purchaseHistory.txt', {encoding: 'utf8', flag: 'r'})
        return data
    }

    writeFile(data: string) {
        this.fs.writeFileSync('./purchaseHistory.txt', data )
    }
}