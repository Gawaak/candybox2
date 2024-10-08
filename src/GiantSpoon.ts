///<reference path="EqItem.ts"/>

import {EqItem} from "./EqItem";
import {Quest} from "./Quest";
import {Player} from "./Player";
import {QuestEntityWeapon} from "./QuestEntityWeapon";
import {Naming} from "./Naming";

export class GiantSpoon extends EqItem{
    // Constructor
    constructor(){
        super("eqItemWeaponGiantSpoon",
              "eqItemWeaponGiantSpoonName",
              "eqItemWeaponGiantSpoonDescription",
              "eqItems/weapons/giantSpoon");
    }
    
    // Public getters
    public getQuestEntityWeapon(quest: Quest, player: Player): QuestEntityWeapon{
        var qew: QuestEntityWeapon = 
                 new QuestEntityWeapon(quest,
                                       player,
                                       new Naming("A giant spoon", "a giant spoon"),
                                       player.getClassicCollisionBoxCollection(),
                                       70
                                      );
        qew.getCloseCombatDelay().setFixedDelay(7, 0);
        return qew;
    }
}