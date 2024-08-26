import StringMethods from "./StringMethods";

export class RenderTag {
    private tagString: string;
    private x: number;

    // Constructor
    constructor(x: number, tagString: string) {
        this.x = x;
        this.tagString = tagString;
    }

    // Public methods
    public clone(): RenderTag {
        return new RenderTag(this.x, this.tagString);
    }

    public draw(str: string): string {
        //Todo create JSX elements here
        return StringMethods.addAt(str, this.x, this.tagString)
    }


    // Public getters
    public getString(): string {
        return this.tagString;
    }

    public getX(): number {
        return this.x;
    }

    // Public setters
    public setX(x: number): RenderTag {
        this.x = x;
        return this;
    }
}