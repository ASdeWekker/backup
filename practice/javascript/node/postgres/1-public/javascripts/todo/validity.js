let text = document.getElementById("text")

text.addEventListener("input", (e) => {
    if (text.validity.typeMismatch) {
        text.setCustomValidity("Fill something in, bitch!")
    } else {
        text.setCustomValidity("")
    }
})
