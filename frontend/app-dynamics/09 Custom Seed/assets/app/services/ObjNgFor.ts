import {PipeTransform, Pipe} from "@angular/core";
/**
 * Created by dkandpal on 7/27/17.
 */
@Pipe({name: 'ObjNgFor'})
export class ObjNgFor implements PipeTransform {
    transform(value, args:string[]) : any {
        let keys = [];
        for (let key in value) {
            keys.push({key: key, value: value[key]});
        }
        return keys;
    }
}