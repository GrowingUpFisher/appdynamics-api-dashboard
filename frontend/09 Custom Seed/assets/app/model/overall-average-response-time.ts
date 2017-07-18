/**
 * Created by dkandpal on 7/10/17.
 */

export class OverallAverageResponseTime {

    timestamp : Date;
    value : number;

}

export class AverageResponseTime {
    data : OverallAverageResponseTime[] = [];
}

