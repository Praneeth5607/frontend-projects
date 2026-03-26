function submit()
{
    let slots = parseInt(document.getElementById("totalSlots").value);
    let attended = parseInt(document.getElementById("attendedSlots").value);

    let txt = document.getElementById("percent_display");
    let skips = document.getElementById("skip")
    const resultBox = document.querySelector(".result");

    let skip = Math.floor((attended - 0.75 * slots) / 0.75);


    if(isNaN(slots) || isNaN(attended) || slots == 0 ||slots < attended)
    {
        txt.textContent = "Invalid Input";
        txt.style.color = "black";
        resultBox.style.display = "flex";
        skips.textContent = " - "
        return;
    }
    const percentage = (attended / slots) * 100;
    
    document.getElementById("percent_display").textContent = percentage + "%";
        if (percentage >= 75) {
        txt.style.color = "green";
    } else if (percentage >= 50) {
        txt.style.color = "orange";
    } else {
        txt.style.color = "red";
    }
    resultBox.style.display = "flex";

     if (attended === 0) {
        skips.textContent = "Attend classes first 😢";
    } else {
        let skip = Math.floor((attended - 0.75 * slots) / 0.75);

        if (skip > 0) {
            skips.textContent = skip + " Slots 🥳";
        } else {
            skips.textContent = "0 Slots 😢";
        }
    }
    skips.style.color = "blue"
    document.getElementById("totalSlots").value = "";
    document.getElementById("attendedSlots").value = "";
}