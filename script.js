'use strict';
let filterColor = document.querySelectorAll(".filter-color");
let mainContainer = document.querySelector(".main-container");
let body = document.querySelector("body");
let popUp = document.querySelector(".pop-up");
let plusBtn = document.querySelector(".plus");
let crossBtn = document.querySelector(".cross");
let popInp = document.querySelector(".pop-up-input");
let popColor = document.querySelectorAll(".color");
let ticketId = document.querySelectorAll(".ticket-id");
let lock = document.querySelector(".lock");
let filterContainers = document.querySelectorAll(".filter-color-container");
let colorIn = "black";
let colorArr = ["pink", "blue", "green", "black"];
let allTasks = [];
let flagToLock = false;
let flagToDelete = false;

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

    ticketColorChange(ticket);
    deleteTicket(ticket);
}

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

        ticketColorChange(ticket);
        deleteTicket(ticket);
    }
});

// if the cross button is clicked, and then a ticket, delete the ticket
crossBtn.addEventListener("click", function () {
    if(flagToDelete == false) 
        crossBtn.style.backgroundColor = "rgb(102, 100, 100)";
    else
        crossBtn.style.backgroundColor = "darkgray";
    
    flagToDelete = !flagToDelete;
})

function deleteTicket(ticket) {
    ticket.addEventListener("click", function () {
        if(flagToDelete == true) {
            let id = ticket.children[1].children[0].textContent.slice(1);

            for(let i=0; i<allTasks.length; i++) {
                if(allTasks[i].id == id) {
                    allTasks.splice(i, 1);
                    console.log(allTasks);
                    break;
                }
            }
            let strArr = JSON.stringify(allTasks);
            localStorage.setItem("allTasks", strArr);
            // let index = allTasks.indexOf(ticketObj);
            // console.log(index);
            ticket.remove();
        }
            
    })
}

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
function ticketColorChange(ticket) {
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
            if(allTasks[i].id == ticketId) {
                allTasks[i].col = colorArr[newIndex];
                let strArr = JSON.stringify(allTasks);
                localStorage.setItem("allTasks", strArr);
                console.log(allTasks);
                break;
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

//unlock and lock editing
lock.addEventListener("click", function () {
    // if its locked, unlock it
    let ticketDes = document.querySelectorAll(".ticket-des")
    if(flagToLock == false){
        lock.children[0].remove();
        lock.innerHTML = `<i class="fas fa-lock-open icon"></i>`;
        flagToLock = true;

        //make the content of ticket editable
        for(let i=0; i<ticketDes.length; i++)
            ticketDes[i].setAttribute("contenteditable", "true");            
    }
    else {
        lock.children[0].remove();
        lock.innerHTML = `<i class="fas fa-lock icon"></i>`;
        flagToLock = false;
        allTasks = [];

        for(let i=0; i<ticketDes.length; i++) {
            //make the content of ticket non-editable
            ticketDes[i].setAttribute("contenteditable", "false");  
            
            //store current info in localStorage
            let ticket = ticketDes[i].parentNode.parentNode;
            let ticketObj = {};
            ticketObj.tas = ticket.children[1].children[1].textContent;
            ticketObj.col = ticket.children[0].classList[1];
            ticketObj.id = ticket.children[1].children[0].textContent.slice(1);
            
            allTasks.push(ticketObj);
        }
        let strArr = JSON.stringify(allTasks);
        localStorage.setItem("allTasks", strArr);
    }
})