let filterColor = document.querySelectorAll(".filter");
let mainContainer = document.querySelector(".main-container");
let plusBtn = document.querySelector(".plus");

for (let i = 0; i < filterColor.length; i++) {
  filterColor[i].addEventListener("click", function () {
    let classes = filterColor[i].getAttribute("class");
    let classArr = classes.split(" ");
    let color = classArr[1];

    let mainClasses = mainContainer.getAttribute("class");
    let mainArr = mainClasses.split(" ");
    mainArr[1] = color;
    mainClasses = mainArr.join(" ");
    mainContainer.setAttribute("class", mainClasses);
  });
}

plusBtn.addEventListener("click", function () {
  let task = prompt("Enter your task");
  let color = prompt("Color");

  if (task != "" && color != "") {
    let div = document.createElement("div");
    div.setAttribute("class", "ticket-container");
    div.innerHTML = ` <div class="ticket-color ${color}"></div>
    <div class="ticket-des-conatiner">
        <div class="ticket-id">#Example</div>
        <div class="ticket-des">${task}</div>
    </div>`
    
    mainContainer.appendChild(div);
  }
});
