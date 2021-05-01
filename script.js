let filterColor = document.querySelectorAll(".filter");
let mainContainer = document.querySelector(".main-container")

for(let i=0; i<filterColor.length; i++) {
    filterColor[i].addEventListener("click", function () {
        
        let classes = filterColor[i].getAttribute("class");
        let classArr = classes.split(" ");
        let color = classArr[1];
        console.log(color);

        let mainClasses = mainContainer.getAttribute("class");
        let mainArr = mainClasses.split(" ");
        mainArr[1] = color;
        mainClasses = mainArr.join(" ");
        mainContainer.setAttribute("class", mainClasses)
    });
}