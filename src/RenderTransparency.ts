export class RenderTransparency {
    // Variables
    private alphaCharacter: string; // Character which won't be drawn
    private metaAlphaCharacter: string | null; // Character which will actually show an alpha character

    // Constructor
    constructor(alphaCharacter: string, metaAlphaCharacter: string | null = null) {
        this.alphaCharacter = alphaCharacter;
        this.metaAlphaCharacter = metaAlphaCharacter;
    }

    // Public getters
    public getAlphaCharacter(): string {
        return this.alphaCharacter;
    }

    public getMetaAlphaCharacter(): string | null{
        return this.metaAlphaCharacter;
    }
}