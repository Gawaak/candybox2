///<reference path="Item.ts"/>

import {Item} from "./Item";
import {Pos} from "./Pos";
import {Player} from "./Player";
import {Quest} from "./Quest";

export class GridItem extends Item{
    // Position in the item grid
    private position: Pos;
    
    // Constructor
    constructor(savingName: string, databaseName: string, databaseDescriptionName: string, ascii: string, position: Pos){
        super(savingName, databaseName, databaseDescriptionName, ascii);
        
        this.position = position;
    }
    
    // Public methods
    public update(_player: Player, _quest: Quest): void{
        
    }
    
    // Public getters
    public getPosition(): Pos{
        return this.position;
    }
}