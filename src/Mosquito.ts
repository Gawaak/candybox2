///<reference path="QuestEntity.ts"/>

import {QuestEntity} from "./QuestEntity";
import {Quest} from "./Quest";
import {Pos} from "./Pos";
import {Naming} from "./Naming";
import {RenderArea} from "./RenderArea";
import {CollisionBoxCollection} from "./CollisionBoxCollection";
import {CollisionBox} from "./CollisionBox";
import {QuestEntityMovement} from "./QuestEntityMovement";
import {QuestEntityWeapon} from "./QuestEntityWeapon";

export class Mosquito extends QuestEntity {
    // Constructor
    constructor(quest: Quest, pos: Pos, _groundYPosition: number) {
        super();
        this.init(quest, pos,
            new Naming("A forest mosquito", "a forest mosquito"),
            new RenderArea(1, 1),
            new Pos(0, 0),
            new CollisionBoxCollection(new CollisionBox(this, new Pos(0, 0), new Pos(1, 1))),
            new QuestEntityMovement()
        );

        // Set gravity
        this.getQuestEntityMovement().setGravity(false);

        // Set destructible
        this.setDestructible(true);
        this.setMaxHp(1);
        this.setHp(1);

        // Set the ascii art (well, it's actually just a ".")
        this.getRenderArea().drawString(".");

        // Set the weapon and its delay
        this.addQuestEntityWeapon(new QuestEntityWeapon(this.getQuest(), this, new Naming("A proboscis", "a proboscis"), new CollisionBoxCollection(new CollisionBox(this, new Pos(-1, -1), new Pos(3, 3))), 12));
        this.getLastQuestEntityWeapon().getCloseCombatDelay().setOnceThenWaitDelay(20);
    }

    // update()
    public update(): void {
        // Calculate the distance from the player

        // Go towards the player
        this.goTowards(this.getGlobalPosition(), this.getQuest().getGame().getPlayer().getGlobalPosition().plus(new Pos(1, 0)));

        // Call the mother class update method
        super.update();
    }
}