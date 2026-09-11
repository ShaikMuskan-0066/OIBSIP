const converterForm = document.getElementById("converterForm");

converterForm.addEventListener("submit", function (event) {

    event.preventDefault();


    // Get input values
    const temperatureInput =
        document.getElementById("temperature").value.trim();

    const unit =
        document.getElementById("unit").value;

    const errorMessage =
        document.getElementById("errorMessage");


    // Check empty input
    if (temperatureInput === "") {

        errorMessage.textContent =
            "Please enter a temperature.";

        return;
    }


    // Convert input to number
    const temperature =
        Number(temperatureInput);


    // Check valid number
    if (!Number.isFinite(temperature)) {

        errorMessage.textContent =
            "Please enter a valid number.";

        return;
    }


    let celsius;
    let fahrenheit;
    let kelvin;


    // =========================
    // CELSIUS
    // =========================

    if (unit === "Celsius") {

        // Absolute zero = -273.15°C

        if (temperature < -273.15) {

            errorMessage.textContent =
                "Temperature cannot be below absolute zero (-273.15°C).";

            return;
        }

        celsius = temperature;

        fahrenheit =
            (temperature * 9 / 5) + 32;

        kelvin =
            temperature + 273.15;
    }


    // =========================
    // FAHRENHEIT
    // =========================

    else if (unit === "Fahrenheit") {

        // Absolute zero = -459.67°F

        if (temperature < -459.67) {

            errorMessage.textContent =
                "Temperature cannot be below absolute zero (-459.67°F).";

            return;
        }

        fahrenheit = temperature;

        celsius =
            (temperature - 32) * 5 / 9;

        kelvin =
            (temperature - 32) * 5 / 9 + 273.15;
    }


    // =========================
    // KELVIN
    // =========================

    else if (unit === "Kelvin") {

        // Absolute zero = 0 K

        if (temperature < 0) {

            errorMessage.textContent =
                "Kelvin temperature cannot be below 0 K.";

            return;
        }

        kelvin = temperature;

        celsius =
            temperature - 273.15;

        fahrenheit =
            (temperature - 273.15) * 9 / 5 + 32;
    }


    // Round results
    celsius = celsius.toFixed(2);

    fahrenheit = fahrenheit.toFixed(2);

    kelvin = kelvin.toFixed(2);


    // Create result page URL
    const resultURL =
        "result.html?" +
        "value=" + encodeURIComponent(temperature) +
        "&unit=" + encodeURIComponent(unit) +
        "&celsius=" + encodeURIComponent(celsius) +
        "&fahrenheit=" + encodeURIComponent(fahrenheit) +
        "&kelvin=" + encodeURIComponent(kelvin);


    // Navigate to result page
    window.location.href = resultURL;

});