///<reference path="StatusBarResource.ts"/>

import {StatusBarResource} from "./StatusBarResource";
import {Game} from "./Game";

const formatter = Intl.NumberFormat('en', { notation: 'compact' })

export class Lollipops extends StatusBarResource{
    // Constructor
    constructor(game: Game, savingPrefix: string){
        super(game, savingPrefix);
    }
    
    // Public methods
    public getCurrentAsString(): string{
        return `--o × ${formatter.format(this.getCurrent())}`
    }
}