///<reference path="QuestEntity.ts"/>

import {QuestEntity} from "./QuestEntity";
import {Pos} from "./Pos";
import {Quest} from "./Quest";
import {Naming} from "./Naming";
import {CollisionBoxCollection} from "./CollisionBoxCollection";
import {CollisionBox} from "./CollisionBox";

export class Wall extends QuestEntity{
    // Constructor
    constructor(quest: Quest, pos: Pos){
        super(); this.init(quest, pos,
              new Naming("A wall", "a wall"),
              undefined,
              new Pos(0, 0),
              new CollisionBoxCollection()
             );
    }
    
    // Public method
    public addBox(pos: Pos, size: Pos): void{
        this.getCbc().addCollisionBox(new CollisionBox(this, pos, size));
    }
    
    public removeBoxes(): void{
        this.getCbc().removeBoxes();
    }
}