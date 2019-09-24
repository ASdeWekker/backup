function showItem(id) {
    let xhttp, obj
    // if (id == "") {
    //     document.getElementById("item").innerHTML = ""
    //     return
    // }
    xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            obj = JSON.parse(this.responseText)
            document.getElementById("title").innerHTML = obj.title
            document.getElementById("text").innerHTML = obj.text
            document.getElementById("complete").innerHTML = obj.complete
            document.getElementById("prev").href = "/todo/items/" + parseInt(obj.id - 1)
            document.getElementById("next").href = "/todo/items/" + parseInt(obj.id + 1)
            document.getElementById("edit").href = "/todo/items/edit/" + obj.id
            document.getElementById("delete").href = "/todo/items/" + obj.id
        }
    }
    xhttp.open("GET", "/todo/items/json/" + id, true)
    history.pushState("", "", "/todo/items/" + id)
    xhttp.send()
}