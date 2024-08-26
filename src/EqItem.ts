///<reference path="Item.ts"/>

import {Quest} from "./Quest";
import {QuestEntityWeapon} from "./QuestEntityWeapon";
import {Naming} from "./Naming";
import {Player} from "./Player";
import {Item} from "./Item";

export class EqItem extends Item{
    // Public methods    
    public update(_player: Player, _quest: Quest): void{
        
    }
    
    // Public getters
    public getQuestEntityWeapon(quest: Quest | null, player: Player): QuestEntityWeapon{
        return new QuestEntityWeapon(quest, player, new Naming("???", "???")); 
    }
}