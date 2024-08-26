import {RenderArea} from "./RenderArea";
// @ts-ignore
import $ from "jquery"
import {Pos} from "./Pos.ts";

export class RenderLocation {
    private locationString: string = "";
    private scrolling: boolean | null = null;

    // Constructor
    constructor(locationString: string, scrolling: boolean = false) { // Not activated by default
        this.setLocationString(locationString);
        this.setScrolling(scrolling);
    }

    // Public methods
    public render(renderArea: RenderArea): void {
        $(this.locationString).html(renderArea.getForRendering());
        renderArea.runLinks();
    }

    public setContentGap(gap: number): void {
        var ex: number, outerWidth: number, addGap: number = 0;

        // Get our outer width
        outerWidth = $(this.locationString).width();
        const containerWidth = $("#contentContainer").width()


        // Get the real ex value
        ex = this.getExValue();
        // If our outerWidth is bigger than the window, calc an additional gap
        if (outerWidth > containerWidth)
            addGap = -(outerWidth - containerWidth) / 2;

        if (this.scrolling) addGap = 0

        // Finally change the "left" value of our div
        $(this.locationString).css({"left": `${((gap / 2) * ex + addGap)}px`});
    }

    // Public setters
    public setLocationString(locationString: string): void {
        this.locationString = locationString;
    }

    public setScrolling(scrolling: boolean, defaultScroll: Pos = new Pos): void {
        // If the scrolling is different
        if (this.scrolling != scrolling) {
            this.scrolling = scrolling;

            // We initialize or stop scrolling, depending on the new scrolling value
            if (this.scrolling) this.initScrolling(defaultScroll);
            else this.stopScrolling();
        }
    }

    // Public getters
    public getScroll(): { x: number, y: number } {
        const elem = $("#contentContainer")
        return {y: elem.scrollTop(), x: elem.scrollLeft()}
    }

    // Private methods
    private getExValue(): number {
        return ($("#getExValue").width())
    }

    private initScrolling(defaultScroll: Pos): void {
        $("#contentContainer").css({
            "overflow": "scroll",
        })

        // Scroll to the default scroll
        $("#contentContainer").scrollTop(defaultScroll.y);
        $("#contentContainer").scrollLeft(defaultScroll.x);

        // Set css for our location string
        $(this.locationString).css({
            'right': '0', // With this, the scrolling place (the map for example) is sticked to the left of the page
            'top': '0', // With this, the scrolling place (the map for example) go below the status bar
            'overflow': 'hidden'
        });
    }

    private stopScrolling(): void {
        $("#contentContainer").scrollLeft(0)
        $("#contentContainer").css({
            "overflow-y": "scroll",
            "overflow-x": "hidden",
        })
        // return;
        // Set the scroll to 0
        // $("#contentContainer").scrollTop(0);

        // Reset css for our location string
        $(this.locationString).css({
            'position': 'relative',
            'left': '0',
            // 'overflow-y': 'scroll'
            'overflow': 'hidden',
        });

        // Reset css for around the status bar
        // $("#aroundStatusBar").css({
        //     'position': 'relative',
        //     'top': 'auto',
        //     'left': 'auto',
        //     'right': 'auto',
        //     'height': 'auto',
        // });
    }
}
