import Branch from "./branch"
import Customer from "./customer"

export default class Bank {
    private _name: string
    private _branches: Branch[]

    constructor (private name: string) {
        this._branches = []
        this._name = name
    }

    addBranch(branch: Branch): boolean {
        if(this.checkBranch(branch)) {
            return false
        } else {
            this._branches.push(branch)

            return true
        } 
    }

    addCustomer(branch: Branch, customer: Customer): boolean {
        if(branch.getCustomers().map(customer => customer.getName()).includes(customer.getName())) {
            return false

        } else {
            branch.addCustomer(customer)
            
            return true
        }
    }

    addCustomerTransaction(branch: Branch, customerId: string, amount: number): boolean {
        let customer = branch.findCustomer(customerId)

        if(customer) {
            customer.addTransactions(amount)
            return true

        } else {

            return false
        }
    }

    findBranchByName(name: string): Branch[] | null {
        let branches = this._branches.filter(branch => branch.getName().toLowerCase().includes(name.toLowerCase()))

        if (branches.length === 0) {
            return null

        } else {
            return branches
        }
    }

    checkBranch(branch: Branch): boolean {
        if (this._branches.includes(branch)) {
            return true

        } else {

            return false
        }
    }

    listCustomers(branch: Branch, isTrue: boolean): boolean {
        if(!this.checkBranch(branch)) {
            return false
        }
        if (isTrue) {
            console.log(branch.getCustomers().map(customer => ({
                name: customer.getName(), 
                transactions: customer.getTransactions().map(transaction => 
                    `${transaction.amount} || ${transaction.date.toDateString()}`)
                })
            ));
        } else {
            
            console.log(branch.getCustomers().map(customer => customer.getName()))
        }

        return true
    }

}