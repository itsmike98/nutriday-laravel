document.addEventListener("DOMContentLoaded", () => {
    console.log("HOASIHFOAS");
    const numeroEl = document.querySelector(".kcal-number");
    console.log(numeroEl);

    const calories = [345, 730, 523, 835, 648];

    numeroEl.textContent = calories[0];
});
