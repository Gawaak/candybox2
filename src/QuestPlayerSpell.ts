// Potions
import {Saving} from "./Saving";
import {Quest} from "./Quest";
import {Pos} from "./Pos";
import {Color} from "./Color";
import {CallbackCollection} from "./CallbackCollection";
import {RenderArea} from "./RenderArea";
import {QuestPlayerSpellCountdownType} from "./QuestPlayerSpellCountdownType";

Saving.registerBool("questPlayerSpellHealthPotionHasSpell", false);
Saving.registerBool("questPlayerSpellTurtlePotionHasSpell", false);
Saving.registerBool("questPlayerSpellAntiGravityPotionHasSpell", false);
Saving.registerBool("questPlayerSpellBerserkPotionHasSpell", false);
Saving.registerBool("questPlayerSpellCloningPotionHasSpell", false);
Saving.registerBool("questPlayerSpellPPotionHasSpell", false);
Saving.registerBool("questPlayerSpellXPotionHasSpell", false);

Saving.registerNumber("questPlayerSpellHealthPotionQuantity", 0);
Saving.registerNumber("questPlayerSpellAntiGravityPotionQuantity", 0);
Saving.registerNumber("questPlayerSpellTurtlePotionQuantity", 0);
Saving.registerNumber("questPlayerSpellBerserkPotionQuantity", 0);
Saving.registerNumber("questPlayerSpellCloningPotionQuantity", 0);
Saving.registerNumber("questPlayerSpellPPotionQuantity", 0);
Saving.registerNumber("questPlayerSpellXPotionQuantity", 0);

export class QuestPlayerSpell {
    // The quest
    private quest: Quest;

    // The button which will appear above the quest
    private buttonClassName: string;
    private buttonPosition: Pos;
    private buttonText: string;
    private buttonColor: Color;

    // The callback collection to call when the spell is used
    private callbackCollection: CallbackCollection;
    private callbackCollectionOnCast: CallbackCollection

    // The countdown type
    private countdownType: QuestPlayerSpellCountdownType;
    private countdownTime: number;

    // The underlined & hotkey stuff

    // The number we can load via the Saving module. If it is > 0, then we can use the spell and set it -= 1
    private numberIdWichLimitsQuantity: string | null;

    // Constructor
    constructor(quest: Quest, buttonClassName: string, buttonPosition: Pos, buttonText: string, buttonColor: Color, callbackCollection: CallbackCollection, countdownType: QuestPlayerSpellCountdownType, countdownTime: number, _underlinedLetter: any, _hotkeyLetter: any, numberIdWichLimitsQuantity: string | null = null) {
        this.quest = quest;
        this.buttonClassName = buttonClassName;
        this.buttonPosition = buttonPosition;
        this.buttonText = buttonText;
        this.buttonColor = buttonColor;
        this.callbackCollection = callbackCollection;
        this.countdownType = countdownType;
        this.countdownTime = countdownTime;
        this.numberIdWichLimitsQuantity = numberIdWichLimitsQuantity;
        this.callbackCollectionOnCast = new CallbackCollection();
    }

    private getText(): string {
        var text: string = this.buttonText;

        // Possibly modify the text depending on numberIdWichLimitsQuantity
        if (this.numberIdWichLimitsQuantity != null) {
            if (Saving.loadNumber(this.numberIdWichLimitsQuantity) <= 999)
                text += " " + Saving.loadNumber(this.numberIdWichLimitsQuantity);
            else
                text += " 999+";
        }
        return text
    }

    // Public methods
    public draw(renderArea: RenderArea, position: Pos, otherClass = ""): void {
        // Set the text
        var text: string = this.getText()
        // Add the button
        renderArea.addAsciiRealButton(text, position.x + this.buttonPosition.x, position.y + this.buttonPosition.y, this.buttonClassName + " keepBlackTextWhenInverted " + otherClass, "", false, -1, this.buttonColor);

        // Add the link
        renderArea.addLinkDownCall("." + this.buttonClassName, new CallbackCollection(this.cast.bind(this)));
    }

    // Public getters
    public getButtonPosition(): Pos {
        return this.buttonPosition;
    }

    public getCountdownType(): QuestPlayerSpellCountdownType {
        return this.countdownType
    }

    public getTextLength(): number {
        return this.getText().length
    }

    public addCallbackOnCast(cb: () => void, reset = true) {
        if (reset) {
            this.callbackCollectionOnCast.reset()
        }
        this.callbackCollectionOnCast.addCallback(cb)
    }

    // Private methods
    private cast(): void {
        var canWeCast: boolean = true;

        // Ceck if the quest is ended to possibly set canWeCast to false
        if (this.quest.getQuestEnded())
            canWeCast = false;

        // Check the countdown to possibly set canWeCast to false
        if (canWeCast == true) {
            this.callbackCollectionOnCast.fire()
            switch (this.countdownType) {
                case QuestPlayerSpellCountdownType.SPELLS:
                    if (this.quest.getPlayerSpellsCountdown() > 0)
                        canWeCast = false;
                    break;
                case QuestPlayerSpellCountdownType.POTIONS:
                    if (this.quest.getPlayerPotionsCountdown() > 0)
                        canWeCast = false;
                    break;
                case QuestPlayerSpellCountdownType.BLACKHOLE:
                    if (this.countdownTime <= 0)
                        canWeCast = false;
                    break;
                default:
                    break;
            }
        }

        // Check the numberIdWichLimitsQuantity to possibly set canWeCast to false
        if (this.numberIdWichLimitsQuantity != null) {
            if (Saving.loadNumber(this.numberIdWichLimitsQuantity) <= 0) {
                canWeCast = false;
            }
        }

        // If we can cast
        if (canWeCast == true) {
            // Handle the countdown
            switch (this.countdownType) {
                case QuestPlayerSpellCountdownType.SPELLS:
                    this.quest.increasePlayerSpellsCountdown(this.countdownTime);
                    break;
                case QuestPlayerSpellCountdownType.POTIONS:
                    this.quest.increasePlayerPotionsCountdown(this.countdownTime);
                    break;
                case QuestPlayerSpellCountdownType.BLACKHOLE:
                    this.countdownTime -= 1;
                    break;
                default:
                    break;
            }

            // Handle numberIdWichLimitsQuantity
            if (this.numberIdWichLimitsQuantity != null) {
                Saving.saveNumber(this.numberIdWichLimitsQuantity, Saving.loadNumber(this.numberIdWichLimitsQuantity) - 1);
            }

            // Fire the callback collection which was given to us
            this.callbackCollection.fire();
        }
    }
}
