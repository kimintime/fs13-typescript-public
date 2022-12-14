import Transaction from "./transaction"

export default class Customer {
    private _name: string
    private _id: string
    private _transactions: Transaction[]

    constructor(name: string) {
        this._name = name
        this._transactions = []
        this._id = Math.random().toString(36).slice(2, 7)
    }

    getName = () => this._name

    getId = () => this._id

    getTransactions = () => this._transactions

    getBalance() {
        return this.getTransactions().reduce((x, y) => x + y.amount, 0)
    }

    addTransactions(amount: number): boolean {
        if (this.getBalance() + amount < 0) {
            return false

        } else {

            let newTransaction: Transaction = {
                amount: amount,
                date: new Date(),
            }
            this._transactions.push(newTransaction)
            
            return true;
        }
    }
}