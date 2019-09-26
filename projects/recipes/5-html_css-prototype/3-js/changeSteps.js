var instructionsCount = 2

function addStepInstructions() {
    var oldStep = "instructions-" + instructionsCount
    instructionsCount++
    var newStep = "instructions-" + instructionsCount
    var sibling = document.getElementsByClassName(oldStep)[0]
    var input = "<div class='form--input-wrap " + newStep + "'>\
        <input class='form--input-wrap--input' placeholder='.' id='" + newStep + "'>\
        <label class='form--input-wrap--label' for='" + newStep + "'>- Stap " + instructionsCount + "</label>\
    </div>"
    sibling.insertAdjacentHTML("afterend", input)
}

function removeStepInstructions() {
    var instructions = "instructions-" + instructionsCount
    var step = document.getElementsByClassName(instructions)[0]
    if (instructionsCount == 1) {
        alert("Beter niet deze weghalen pik")
    } else {
        step.remove()
        instructionsCount--
    }
}

document.getElementsByClassName("button-instructions-add")[0].onclick = addStepInstructions
document.getElementsByClassName("button-instructions-delete")[0].onclick = removeStepInstructions

var ingredientsCount = 2

function addStepIngredients() {
    var oldStep = "ingredients-" + ingredientsCount
    ingredientsCount++
    var newStep = "ingredients-" + ingredientsCount
    var sibling = document.getElementsByClassName(oldStep)[0]
    var input = "<div class='form--input-wrap " + newStep + "'>\
        <input class='form--input-wrap--input' placeholder='.' id='" + newStep + "'>\
        <label class='form--input-wrap--label' for='" + newStep + "'>- Ingredient " + ingredientsCount + "</label>\
    </div>"
    sibling.insertAdjacentHTML("afterend", input)
}

function removeStepIngredients() {
    var ingredients = "ingredients-" + ingredientsCount
    var step = document.getElementsByClassName(ingredients)[0]
    if (ingredientsCount == 1) {
        alert("Beter niet deze weghalen pik")
    } else {
        step.remove()
        ingredientsCount--
    }
}

document.getElementsByClassName("button-ingredients-add")[0].onclick = addStepIngredients
document.getElementsByClassName("button-ingredients-delete")[0].onclick = removeStepIngredients
