import {QuestEntityDamageReasonWhoType} from "./QuestEntityDamageReasonWhoType";
import {QuestEntity} from "./QuestEntity";
import {QuestEntityDamageReasonWhatType} from "./QuestEntityDamageReasonWhatType";
import {QuestEntityWeapon} from "./QuestEntityWeapon";
import {Naming} from "./Naming";
import {QuestEntityTeam} from "./QuestEntityTeam";

export class QuestEntityDamageReason {
    // Type of the thing who caused the damage
    private whoType: QuestEntityDamageReasonWhoType;

    // Additional parameters, depeding on the who type
    // NATURE : no parameter
    // ENTITY
    private questEntity: QuestEntity | null = null;
    private questEntityTeam: QuestEntityTeam | null = null;

    // Type of the thing used to cause the damage
    private whatType: QuestEntityDamageReasonWhatType;

    // Additional parameters, depeding on the what type
    // WEAPON
    private questEntityWeapon: QuestEntityWeapon | null = null;
    // SPELL
    private spellNaming: Naming | null = null;

    // Constructor
    constructor(whoType: QuestEntityDamageReasonWhoType, whatType: QuestEntityDamageReasonWhatType) {
        this.whoType = whoType;
        this.whatType = whatType;
    }

    // Public methods
    public getQuestEntityTeam(): QuestEntityTeam | null {
        return this.questEntityTeam;
    }

    public getWhatNaming(): Naming | null {
        switch (this.whatType) {
            case QuestEntityDamageReasonWhatType.WEAPON:
                return this.questEntityWeapon?.getNaming() ?? null;
            case QuestEntityDamageReasonWhatType.SPELL:
                return this.spellNaming;
        }
    }

    public getWhoNaming(): Naming | null {
        switch (this.whoType) {
            case QuestEntityDamageReasonWhoType.NATURE:
                return new Naming("Nature", "nature");
            case QuestEntityDamageReasonWhoType.ENTITY:
                return this.questEntity?.getNaming() ?? null;
        }
    }

    // Public setters
    public setQuestEntity(questEntity: QuestEntity, questEntityTeam: QuestEntityTeam | null = null): QuestEntityDamageReason {
        this.questEntity = questEntity;
        if (questEntityTeam == null) this.questEntityTeam = questEntity.getTeam();
        else this.questEntityTeam = questEntityTeam;
        return this;
    }

    public setQuestEntityWeapon(questEntityWeapon: QuestEntityWeapon): QuestEntityDamageReason {
        this.questEntityWeapon = questEntityWeapon;
        return this;
    }

    public setSpellNaming(naming: Naming): QuestEntityDamageReason {
        this.spellNaming = naming;
        return this;
    }
}