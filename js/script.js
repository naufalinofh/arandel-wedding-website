class BlurryImageLoad {
    supportsCSSFilters(enableWebkit) {
        // Copied from https://stackoverflow.com/a/11047247
        if (enableWebkit === undefined) {
            enableWebkit = false;
        }
        //creating an element dynamically
        const element = document.createElement("test");
        //adding filter-blur property to it
        element.style.cssText =
            (enableWebkit ? "-webkit-" : "") + "filter: blur(2px)";
        //checking whether the style is computed or ignored
        const test1 = element.style.length != 0;
        //checking for false positives of IE
        //I prefer Modernizr's smart method of browser detection
        const test2 =
            document.documentMode === undefined || document.documentMode > 9;
        //non-IE browsers, including ancient IEs
        //IE compatibility mode
        //combining test results
        return test1 && test2;
    }

    load(images = document.querySelectorAll(".blurry-load")) {
        if (!this.supportsCSSFilters(true) && !this.supportsCSSFilters(false)) {
            /* If the browser does not support CSS filters
            	Checks with and without the -webkit- prefix */
            for (let image of images) {
                image.src = "";
                image.classList.add("no-blur");
                image.classList.remove("blurry-load");
            }
        }
        /* Fallback for browsers that don't support support CSS filters (mainly IE)
        	If the browser doesn't support CSS filters,
        	display a gray background with a shimmer gradient (see the CSS class no-blur for details) */

        for (let image of images) {
            const currentImage = new Image();
            currentImage.src = image.getAttribute("data-large");

            currentImage.onload = () => {
                image.src = currentImage.src;
                image.classList.add("blur-out");
                image.classList.remove("blurry-load");
            };
        }
        // The main function that loads each image once the page has loaded
    }
}

$(document).ready(function() {
    const blurryImageLoad = new BlurryImageLoad();
    blurryImageLoad.load();

    $(window).on("load", function() {
            $('#home1').removeClass("background-header-low");
            $('#home1').addClass("background-header");
        })
        /* ---- Countdown timer ---- */

    $('#counter').countdown({
        timestamp: new Date('2020-08-22T01:00:00')
    });


    /* ---- Animations ---- */
    $('#links a').hover(
        function() { $(this).animate({ left: 3 }, 'fast'); },
        function() { $(this).animate({ left: 0 }, 'fast'); }
    );

    $('footer a').hover(
        function() { $(this).animate({ top: 3 }, 'fast'); },
        function() { $(this).animate({ top: 0 }, 'fast'); }
    );

    // for detecting if the browser is Safari
    var browser = navigator.userAgent.toLowerCase();
});