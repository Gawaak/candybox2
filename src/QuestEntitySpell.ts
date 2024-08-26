///<reference path="QuestEntity.ts"/>

import {QuestEntity} from "./QuestEntity";
import {Quest} from "./Quest";
import {Pos} from "./Pos";
import {Naming} from "./Naming";
import {RenderArea} from "./RenderArea";
import {CollisionBoxCollection} from "./CollisionBoxCollection";
import {QuestEntityMovement} from "./QuestEntityMovement";
import {QuestEntityAnimation} from "./QuestEntityAnimation";
import {QuestEntitySpellColor} from "./QuestEntitySpellColor";

export class QuestEntitySpell extends QuestEntity {
    // Colors
    private colors: QuestEntitySpellColor[] = [];

    constructor() {
        super();
    }

    // Constructor
    init2(quest: Quest, pos: Pos, naming: Naming, renderArea: RenderArea | null = null, renderAreaPosition: Pos = new Pos(0, 0), cbc: CollisionBoxCollection | null = null, questEntityMovement: QuestEntityMovement | null = null, questEntityAnimation: QuestEntityAnimation | null = null) {
        super.init(quest, pos,
            naming,
            renderArea,
            renderAreaPosition,
            cbc,
            questEntityMovement,
            questEntityAnimation
        );

        // Set isASpell
        this.setIsASpell(true);
    }

    // Public methods
    public addColor(color: QuestEntitySpellColor): void {
        this.colors.push(color);
    }

    public draw(renderArea: RenderArea): void {
        // Call the mother class draw method
        super.draw(renderArea);

        // Draw the colors
        for (var i = 0; i < this.colors.length; i++) {
            this.colors[i].draw(renderArea, this.getQuest().getRealQuestPosition().plus(this.getGlobalPosition()).plus(this.getQuest().getGlobalDrawingOffset()));
        }
    }

    public removeColors(): void {
        this.colors = [];
    }
}