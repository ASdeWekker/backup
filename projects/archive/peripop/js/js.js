var interv;
function addM() {
    interv = setInterval(addIt, 150);
}
function addIt() {
    var ptje = document.getElementById("ptje");
    ptje.innerHTML = ptje.innerHTML + " m";
}
