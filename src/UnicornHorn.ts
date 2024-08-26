///<reference path="GridItem.ts"/>

import {Player} from "./Player";
import {Quest} from "./Quest";
import {GridItem} from "./GridItem";

export class UnicornHorn extends GridItem{
    public update(player: Player, _quest: Quest): void{
        player.heal(3);
    }
}