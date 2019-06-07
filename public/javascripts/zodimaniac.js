//Form will submit when you choose a file.
if (document.getElementById("uploadFile") !== null) {
    document.getElementById("uploadFile").onchange = function () {
        document.getElementById("profileForm").submit();
    };
}

if (document.getElementById("maxDistSlider") !== null) {
    document.getElementById("maxDistSlider").addEventListener("change", function(){
        document.getElementById('rangeValue').value = document.getElementById("maxDistSlider").value + " Km";
    
    })
}

