let filterColor = document.querySelectorAll(".filter-color");
let mainContainer = document.querySelector(".main-container");
let body = document.querySelector("body");
let popUp = document.querySelector(".pop-up");
let plusBtn = document.querySelector(".plus");
let popInp = document.querySelector(".pop-up-input");
let popColor = document.querySelectorAll(".color");
let ticketId = document.querySelectorAll(".ticket-id");
let filterContainers = document.querySelectorAll(".filter-color-container");
let colorIn = "black";
let colorArr = ["pink", "blue", "green", "black"];
let allTasks = [];

if (localStorage.getItem("allTasks")) {
    let strArr = localStorage.getItem("allTasks");
    allTasks = JSON.parse(strArr);

    for (let i = 0; i < allTasks.length; i++) 
        createTicketFromLocal(allTasks[i]);
}

function createTicketFromLocal(taskObj) {
    let {id, col, tas} = taskObj;
    let ticket = document.createElement("div");
    ticket.setAttribute("class", "ticket-container");
    
    ticket.innerHTML = ` <div class="ticket-color ${col}"></div>
        <div class="ticket-des-conatiner">
            <div class="ticket-id">#${id}</div>
            <div class="ticket-des">${tas}</div>
        </div>`;

    mainContainer.appendChild(ticket);

    addFunctionality(ticket);
}

// for (let i = 0; i < filterColor.length; i++) {
//     filterColor[i].addEventListener("click", function () {
//         let classes = filterColor[i].getAttribute("class");
//         let classArr = classes.split(" ");
//         let color = classArr[1];

//         body.setAttribute("class", color);
//     });
// }

plusBtn.addEventListener("click", function () {
    popUp.style.display = "flex";
});

popInp.addEventListener("keydown", function (e) {
    if (e.key == "Enter" && popInp.value != "") {
        let ticket = document.createElement("div");
        ticket.setAttribute("class", "ticket-container");
        let task = popInp.value;
        let uniqid = Math.random().toString(32).slice(2);
        ticket.innerHTML = ` <div class="ticket-color ${colorIn}"></div>
        <div class="ticket-des-conatiner">
            <div class="ticket-id">#${uniqid}</div>
            <div class="ticket-des">${task}</div>
        </div>`;

        //for local storage
        let ticketObj = {};
        ticketObj.tas = task;
        ticketObj.col = colorIn;
        ticketObj.id = uniqid;
        allTasks.push(ticketObj);
        let strArr = JSON.stringify(allTasks);
        localStorage.setItem("allTasks", strArr);

        popUp.style.display = "none";
        popInp.value = "";
        mainContainer.appendChild(ticket);

        addFunctionality(ticket);
    }
});

//if a color is selected in + pop up, then selecting that color
for (let i = 0; i < popColor.length; i++) {
    popColor[i].addEventListener("click", function () {
        let colorTi = popColor[i].classList[1];
        colorIn = colorTi;

        // remove everyone
        for (let j = 0; j < popColor.length; j++)
            popColor[j].classList.remove("border");

        popColor[i].classList.add("border");
    });
}

//if we click on the colored line of ticket, then 
// it changes  color
function addFunctionality(ticket) {
    let ticketColor = ticket.querySelector(".ticket-color");
    ticketColor.addEventListener("click", function () {
        let cColor = ticketColor.classList[1];
        let index = colorArr.indexOf(cColor);
        let newIndex = (index + 1) % 4;

        ticketColor.classList.remove(cColor);
        ticketColor.classList.add(colorArr[newIndex]);

        //add to local
        let ticketIdEle = ticket.querySelector(".ticket-id");
        let ticketId = ticketIdEle.innerText;
        ticketId = ticketId.slice(1);

        for(let i=0; i<allTasks.length; i++) {
            if(allTasks.id == ticketId) {
                allTasks[i].color = colorArr[newIndex];
                let strArr = JSON.stringify(allTasks);
                localStorage.setItem("allTasks", strArr);
            }
        }
    });
}

//filtering logic
let prevColor = null;
for (let i = 0; i < filterContainers.length; i++) {
    filterContainers[i].addEventListener("click", function () {
        let child = filterContainers[i].children[0];
        let fcolor = child.classList[1];
        let ticket = document.querySelectorAll(".ticket-container");

        if (prevColor == fcolor) {
            for (let j = 0; j < ticket.length; j++)
                ticket[j].style.display = "block";
            prevColor = null;
        } else {
            for (let j = 0; j < ticket.length; j++) {
                let color = ticket[j].children[0];
                let myColor = color.classList[1];

                if (myColor == fcolor) ticket[j].style.display = "block";
                else ticket[j].style.display = "none";
            }
            prevColor = fcolor;
        }
    });
}


