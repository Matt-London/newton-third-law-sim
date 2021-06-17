const forceSlider = document.getElementById("force-slider");
const forceReading = document.getElementById("reading");
const forceInputText = document.getElementById("force-input");
const scale1 = document.getElementById("scale1");
const scale2 = document.getElementById("scale2");

var force = 0.1;


// Sets both scales to the force that was inputted
function set_scales() {
    scale1.innerText = force + " N";
    scale2.innerText = force + " N";
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

    set_scales();

});

forceSlider.addEventListener('input', (event) => {
    force = parseFloat(forceSlider.value) / 10;

    forceReading.innerText = force + " N";

    forceInputText.value = force;

    set_scales();

});