///<reference path="RenderTag.ts"/>

import {RenderTag} from "./RenderTag";
import StringMethods from "./StringMethods";

export class RenderTagLt extends RenderTag {
    // Constructor
    constructor(x: number) {
        super(x, "");
    }

    // Public methods
    public clone(): RenderTagLt {
        return <RenderTagLt>super.clone();
    }

    public draw(str: string): string {
        // Instead of adding ourselves, we delete one character under the x position and then add the "&lt;"
        str = StringMethods.replaceAt(str, this.getX(), "&")
        return StringMethods.addAt(str, this.getX() + 1, "lt;")
    }
}