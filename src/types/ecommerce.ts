import { Entity } from "./common"
import { Product } from "./product"
import { User } from "./user"

export class List<T extends Entity> extends Array<T> {

    // constructor() {
    //     super()
    // }

    /* fix function fetchAll to save data in the array once the fetching is successful*/
    async fetchAll(url: string): Promise<T[] | Error> { //Thank you to Roman for helping me get this working
        const jsondata = await fetch(url)
        const data: T[] | Error = await jsondata.json()

        if ("message" in data) {
            throw new Error ("Fetch failed")
        }
        this.push(...data)

        return data
    }
    /* complete the function sortList() with a parameter "order", which can be 
    either "asc" or "desc". Sort the array by id according to the given order and return the
    reference to the same array*/
      sortList(order:string) {
        if (order === 'desc') {
            return this.sort((a, b) => b.id - a.id)
        } else {
            return this.sort((a, b) => a.id - b.id)
        }
     }

    /* complete method push(), which overrides original "push" method. New item can be added to the array if 
    id does not exist. Only add all the items to the array if every item satisfies the condition.
    Return 1 if can push all new items to the array, otherwise return 0 */
    push(...items: T[]): number {
        function checkAvailability(arr:T[], id:number) { //From mozilla docs - Thank you Jeremias! :-)
            return arr.some(arrVal => id === arrVal.id);
        }
        
        if (items.map(newItem => checkAvailability(this, newItem.id)).includes(true)) {
            return 0;
        } else {
            for (let i = 0; i < items.length; i++) {
                this[this.length] = items[i];
            }
            return 1;
        }
    }

}

