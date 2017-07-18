import { Application } from './application';

class Realm {
    name: string;
    applicationArr: Application[] = [];
}

class Pod {
    name: string;
    realmArr: Realm[] = [];
}
export class ApplicationMenu {
    podArr: Pod[] = [];
}