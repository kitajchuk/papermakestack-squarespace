// Load the SASS
require( "../sass/screen.scss" );


// Load the JS
import router from "./router";
import * as core from "./core";
import navi from "./navi";
import intro from "./intro";
import Analytics from "./class/Analytics";


/**
 *
 * @public
 * @class App
 * @classdesc Load the App application Class to handle it ALL.
 *
 */
class App {
    constructor () {
        this.core = core;
        this.navi = navi;
        this.intro = intro;
        this.router = router;

        this.bind();
        this.init();
        this.fourTwenty();
    }


    fourTwenty () {
        let timeout = null;
        const fourTwenty = this.core.dom.main.find( ".js-splash em" );
        const tickFourTwenty = () => {
            clearTimeout( timeout );

            const theDate = new Date();
            const theMinutes = theDate.getMinutes();
            const theHours = theDate.getHours();
            const theSplit = theHours >= 12 ? "PM" : "AM";
            const fixHours = theHours > 12 ? theHours - 12 : theHours;
            const fixMinutes = theMinutes < 10 ? `0${theMinutes}` : theMinutes;

            fourTwenty[ 0 ].innerHTML = `${fixHours}:${fixMinutes}${theSplit}`;

            timeout = setTimeout( tickFourTwenty, 10000 );
        };

        tickFourTwenty();
    }


    bind () {
        this.core.emitter.on( "app--intro-teardown", () => {
            this.core.log( "App Intro Teardown" );
        });

        this.core.emitter.on( "app--page-teardown", () => {
            this.core.log( "App Page Teardown" );
        });
    }


    /**
     *
     * @public
     * @instance
     * @method init
     * @memberof App
     * @description Initialize application modules.
     *
     */
    init () {
        // Core
        this.core.detect.init();

        // Utility ?

        // Views
        this.navi.init();
        this.intro.init();

        // Controller
        this.router.init();

        // Analytics
        this.analytics = new Analytics();
    }
}


// Create {app} instance
window.app = new App();


// Export {app} instance
export default window.app;
