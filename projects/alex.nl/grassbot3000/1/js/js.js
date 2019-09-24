// Use setInterval to interval between when the letters are added to the h1.
var i = 0;
var word = "Grassbot3000.nu";
var newword = "";
var h1 = document.getElementById("title");

function speak() {
    if (i < word.length) {
        newword += word[i];
        h1.innerHTML += word[i];
    } else if (i == word.length) {
        clearInterval(timeout);
    }
    i++;
}

var timeout = setInterval(speak, 100);

// Add functionality for visitors to insert their own text and speed);