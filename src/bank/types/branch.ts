import Customer from "./customer"

export default class Branch {
    private _name: string
    private _customers: Customer[]

    constructor(name: string) {
        this._name = name
        this._customers = []
    }

    getName = () => this._name

    getCustomers = () => this._customers

    addCustomer(customer: Customer): boolean {
        if(this._customers.includes(customer)) {
            return false
        } else {
            this._customers.push(customer)

            return true
        }
    }

    addCustomerTransaction(customerId: string, amount: number): boolean {
        let customer = this.findCustomer(customerId)
        
        if (customer) {
            customer.addTransactions(amount)

            return true
        } else {

            return false
        }
        
    }

    findCustomer(customerId: string): Customer | null {
        let customer = this._customers.find(customer => customer.getId() === customerId)

        if (customer === undefined) {
            return null
        } else {

            return customer
        }
    }


}