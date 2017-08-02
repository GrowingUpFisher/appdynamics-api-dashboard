/**
 * Created by dkandpal on 7/5/17.
 */

export class CombinedMultipleLineSeriesData {
    data : MultipleLineSeriesData[] = [];
}
export class MultipleLineSeriesData {
    type : string;
    metaData : MetaData[] = [];

}

export class MetaData {
    metricTimestamp : Date;
    metricValue : number;
}