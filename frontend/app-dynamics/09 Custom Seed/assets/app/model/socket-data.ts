/**
 * Created by dkandpal on 7/25/17.
 */
export class SocketData {
    metrics : Metric[] = [];
}

export class Metric {
 name : string;
 metricDataArr : MetricData[] = [];
}

export class MetricData {

    timestamp : Date;
    value : number;
}