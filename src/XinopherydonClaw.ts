///<reference path="GridItem.ts"/>

import {Player} from "./Player";
import {Quest} from "./Quest";
import {QuestEntity} from "./QuestEntity";
import {QuestEntityDamageReason} from "./QuestEntityDamageReason";
import {GridItem} from "./GridItem";

export class XinopherydonClaw extends GridItem{
    public hit(_player: Player, _quest: Quest, _questEntity: QuestEntity, damage: number, _reason: QuestEntityDamageReason): number{
        return damage*2;
    }
}