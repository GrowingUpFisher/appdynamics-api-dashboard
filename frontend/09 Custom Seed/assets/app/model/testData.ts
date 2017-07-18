/**
 * Created by dkandpal on 6/25/17.
 */


export class Day {
    dayName : number;
    hourName : number;
    value : number;

}

export class Hour {
    hourName : number;
    minName : number;
    value : number;

    valueOf() : number {
        return this.value;
    }
}



