let filterColor = document.querySelectorAll(".filter-color");
let mainContainer = document.querySelector(".main-container");
let body = document.querySelector("body");
let popUp = document.querySelector(".pop-up")
let plusBtn = document.querySelector(".plus");
let popInp = document.querySelector(".pop-up-input");
let popColor = document.querySelectorAll(".color");
let ticketId = document.querySelectorAll(".ticket-id")
let colorIn = "black";
let colorArr = ["pink", "blue", "green", "black"];

for (let i = 0; i < filterColor.length; i++) {
    filterColor[i].addEventListener("click", function () {
        let classes = filterColor[i].getAttribute("class");
        let classArr = classes.split(" ");
        let color = classArr[1];

        body.setAttribute("class", color);
    });
}

plusBtn.addEventListener("click", function () {
    popUp.style.display = "flex";
});
popInp.addEventListener("keydown", function (e) {
    
    if(e.key == "Enter" && popInp.value != "") {
        let ticket = document.createElement("div");
        ticket.setAttribute("class", "ticket-container");
        let task = popInp.value;
        
        ticket.innerHTML = ` <div class="ticket-color ${colorIn}"></div>
        <div class="ticket-des-conatiner">
            <div class="ticket-id">#Example</div>
            <div class="ticket-des">${task}</div>
        </div>`;

        popUp.style.display = "none";
        popInp.value = ""
        mainContainer.appendChild(ticket);

        addFunctionality(ticket);
    }
})
for(let i=0; i<popColor.length; i++) {
    popColor[i].addEventListener("click", function () {
        let colorTi = popColor[i].classList[1];
        colorIn = colorTi;

        // remove everyone
        for(let j=0; j<popColor.length; j++) 
            popColor[j].classList.remove("border");
        
        popColor[i].classList.add("border");
    })
}
function addFunctionality(ticket) {
    let ticketColor = ticket.querySelector(".ticket-color");
    ticketColor.addEventListener("click", function () {
        let cColor = ticketColor.classList[1];
        let index= colorArr.indexOf(cColor);
        let newIndex = (index+1)%4;

        ticketColor.classList.remove(cColor);
        ticketColor.classList.add(colorArr[newIndex]);
    })
}