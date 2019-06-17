var jsInput = document.getElementsByTagName("input");
var jsLabel = document.getElementsByTagName("label");
var jsOther = document.getElementsByClassName("jsHide");
var jsButton = document.getElementsByClassName("jsButton");
var step = 0;
var progressBar = document.getElementById("progressBar");
var stepNum = 0;

//Form will submit when you choose a file.
if (document.getElementById("uploadFile") !== null) {
    document.getElementById("uploadFile").onchange = function () {
        document.getElementById("profileForm").submit();
    };
}

if (document.getElementById("maxDistSlider") !== null) {
    document.getElementById("maxDistSlider").addEventListener("change", function () {
        document.getElementById('rangeValue').value = document.getElementById("maxDistSlider").value + " Km";

    });
}

if (jsInput[0].addEventListener("change", function () {
        // TODO: add timer that checks if change happened

    }));


// This means we are at the Regiser page
if (document.getElementById("signup") !== null) {
    progressiveDisc()

    jsButton[1].addEventListener("click", function () {
        step++;
        console.log("Step " + step);
        jsButton[1].style.display = "none";
        progressiveDisc()
    });

    jsButton[0].addEventListener("click", function () {
        step--;
        console.log("Step " + step);
        progressiveDisc()
    });
}

function progressiveDisc() {
    for (var i = 0; i < jsInput.length; i++) {
        jsInput[i].style.display = "none";
    }

    // hide all the labels
    for (var i = 0; i < jsLabel.length; i++) {
        jsLabel[i].style.display = "none";
    }

    // hide all the others
    for (var i = 0; i < jsOther.length; i++) {
        jsOther[i].style.display = "none";
    }


    switch (step) {
        case 0:
            // show the first label, input and the next button
            jsLabel[step].style.display = "block";
            jsInput[step].style.display = "block";
            jsButton[0].style.display = "none";
            jsButton[1].style.display = "none";
            break;
        case 1:
            jsLabel[step].style.display = "block";
            jsInput[step].style.display = "block";
            jsButton[0].style.display = "initial";

            break;
        case 2:
            jsLabel[step].style.display = "block";
            jsInput[step].style.display = "block";
            break;
        case 3:
            jsLabel[step].style.display = "block";
            jsInput[step].style.display = "block";
            // jsButton[1].style.display = "initial";
            break;
        case 4:
            jsOther[0].style.display = "block";
            jsLabel[4].style.display = "block";
            jsLabel[5].style.display = "block";
            // jsButton[1].style.display = "initial";
            break;
        case 5:
            jsLabel[6].style.display = "block";
            jsInput[6].style.display = "block";
            // jsButton[1].style.display = "initial";
            break;
        case 6:
            jsOther[1].style.display = "block";
            jsLabel[7].style.display = "block";
            jsLabel[8].style.display = "block";
            jsButton[1].style.display = "none";
            break;
    }
    jsInput[step].addEventListener("change", function () {
        console.log("HEY :|)");
        // TODO: add timer that checks if change happened
        jsButton[1].style.display = "initial";
    });
    if(step == 4){
        jsButton[1].style.display = "initial";
    }
    else if(step == 6){
        jsOther[2].style.display = "initial";
    }
    else{
        jsButton[1].style.display = "none";
    }
    jsInput[6].addEventListener("change", function () {
        jsButton[1].style.display = "initial";
    });

    progressBar.value = step;
}