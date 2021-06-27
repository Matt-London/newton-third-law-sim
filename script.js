const forceSlider = document.getElementById("force-slider");
const forceReading = document.getElementById("reading");
const forceInputText = document.getElementById("force-input");
const scaleReadings = document.getElementsByClassName("scale-reading");

// For render
const scale1right = document.getElementById("scale1-right");
const scale2left = document.getElementById("scale2-left");
const scale2right = document.getElementById("scale2-right");
const stickPull = document.getElementById("stick-pull");

var force = 0.1;

// Sets both scales to the force that was inputted
function set_scales() {
    // Set all values with scale-reading class
    // Set 0 to newton
    scaleReadings[0].innerText = force + " N";

    // Set 1 to dyne
    scaleReadings[1].innerText = force + "e5 dyn";

}

// Updates render depending on force
// PLEASE look away for this function haha!
function render() {
    /*
    * var: 0%, 100%
    * scale1right: -82%, -32%
    * scale2left: -50%, -2%
    * scale2right: -50%, 48%
    * stickPull: -5%, 20%
    */ 
    scale1right.style.left = (-82 + (82 - 32) * (force / 100)) + "%";
    scale2left.style.left = (-50 + (50 - 2) * (force / 100)) + "%";
    scale2right.style.left = (-50 + (50 + 48) * (force / 100)) + "%";
    stickPull.style.left = (-5 + (5 + 20) * (force / 100)) + "%";

}

// Runs both update functions
function update() {
    set_scales();
    render();
}

// Updates the slider and textbox as well as reading
// This one manages the textbox
forceInputText.addEventListener('input', (event) => {
    // Drop enters
    if (event.inputType === "insertLineBreak") {
        // Regex move from https://www.codegrepper.com/code-examples/javascript/replace+new+line+textarea+in+javascript
        forceInputText.value = forceInputText.value.replace(/(\r\n|\n|\r)/gm, "");
    }

    // Drop non-numbers
    if (isNaN(event.data)) {
        // Regex from https://stackoverflow.com/questions/1862130/strip-all-non-numeric-characters-from-string-in-javascript
        forceInputText.value = forceInputText.value.replace(/[^\d.-]/g, "");
    }

    force = parseFloat(forceInputText.value);

    if (!isNaN(force) || forceInputText.value) {
        forceReading.innerText = force + " N";
    }
    else {
        forceReading.innerText = "0 N";
        force = 0;
    }
    
    forceSlider.value = force * 10;

});

forceSlider.addEventListener('input', (event) => {
    force = parseFloat(forceSlider.value) / 10;

    forceReading.innerText = force + " N";

    forceInputText.value = force;

});


// Update the scale reading
forceInputText.addEventListener('input', update);
forceSlider.addEventListener('change', update);
