import {RenderLink} from "./RenderLink";
import {CallbackCollection} from "./CallbackCollection";

export class RenderLinkPointerDown extends RenderLink {
    private element: string;
    private callbackCollection: CallbackCollection;

    // Constructor
    constructor(element: string, callbackCollection: CallbackCollection) {
        super();
        this.element = element;
        this.callbackCollection = callbackCollection;
    }

    // Public methods
    public run(): void {
        // We copy the render link so we can use it in the functions below
        var renderLink: RenderLinkPointerDown = this;

        document.querySelectorAll(this.element).forEach(e => {
            // @ts-ignore
            e.onpointerdown = (event: any) => {
                renderLink.callbackCollection.fire();
                event.preventDefault()
                return false; // Avoid event bubbling
            }
        })

        // $(this.element).pointerdown(function(event){
        //     renderLink.callbackCollection.fire();
        //     return false; // Avoid event bubbling
        // });
    }
}