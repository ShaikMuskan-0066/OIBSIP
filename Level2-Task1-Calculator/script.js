const display = document.getElementById("display");


// Add value to the display
function appendValue(value) {
    display.value += value;
}


// Clear all values
function clearDisplay() {
    display.value = "";
}


// Delete the last value
function deleteLast() {
    display.value = display.value.slice(0, -1);
}


// Calculate the expression
function calculateResult() {

    const expression = display.value.trim();

    if (expression === "") {
        return;
    }


    try {

        // Allow only calculator characters
        if (!/^[0-9+\-*/%. ]+$/.test(expression)) {

            display.value = "Error";

            return;
        }


        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();


        if (!Number.isFinite(result)) {

            display.value = "Error";

            return;
        }


        // Open separate result page
        const resultURL =
            "result.html?" +
            "expression=" + encodeURIComponent(expression) +
            "&result=" + encodeURIComponent(result);

        window.location.href = resultURL;

    } catch (error) {

        display.value = "Error";

    }

}