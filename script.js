//for input file
$(".custom-file-input").on("change", function() {
    var fileName = $(this).val().split("\\").pop();
    $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});
  
//declaring variable
var input, extension, inputArray, 
inputX, inputY, lengthX, lengthY, inputXY, sumX, sumY, sumXY, squareSumX, squareSumY, 
squareX, squareY, sumSquareX, sumSquareY, 
lengthXSumSquareX, lengthYSumSquareY, lengthXSumSquareXMinusSquareSumX, lengthYSumSquareYMinusSquareSumY, lengthXYSumSquareXYMinusSumXY, sqrtLengthXYSumSquareXYMinusSumXY, 
lengthSumXY, sumXSumY, lengthXSumXMinusSumXsumY, 
r;
  
//get the input file data
function init() {
    document.getElementById('fileInput').addEventListener('change', handleFileSelect, false);
};
  
function handleFileSelect(event) {
    const reader = new FileReader();
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0]);
};
  
function handleFileLoad(event){
    console.log(event);
    input = event.target.result;
};
  
//calculating the correlation
function calculation() {
    //get the file input extension
    extension = document.getElementById("fileInput").value.split(".")[1];
    console.log(extension);

    if (extension == "dat") {
        inputing();
        console.log(inputArray);
        if (typeof inputY[0] == "string") {
            calculating();
            showResult();
        }
        else {
            warning();
        };
    }
    else {
        if (extension == "txt") {
            inputing();
            console.log(inputArray);
            if (typeof inputY[0] == "string") {
                calculating();
                showResult();
            }
            else {
                warning();
            };
        }
        else {
            warning();
        };
    };
};

//inputing
function inputing() {
    //converting input data from string to array
    inputArray = input.split("\n").map(function (d) {
        return d.split("\t");
    });

    //determining x and y
    inputX = [];
    inputY = [];
    for (i = 0;i < inputArray.length;i++) {
        inputX[i] = inputArray[i][0];
        inputY[i] = inputArray[i][1];
        if (inputX[i] == "-999.25") {
            inputX[i] = "0";
        }
        else {
            inputX[i] = inputX[i];
        };
        if (inputY[i] == "-999.25") {
            inputY[i] = "0";
        }
        else {
            inputY[i] = inputY[i];
        };
    };

    //determining input data x and y length
    lengthX = inputX.length;
    lengthY = inputY.length;
};

//calculating
function calculating() {
    //calculating xy
    inputXY = [];
    for (j =0;j < lengthX;j++) {
        inputXY[j] = inputX[j] * inputY[j];
    }

    //calculating sum of xy
    sumXY = eval(inputXY.join("+"));

    //calculating sum of x and y
    sumX = eval(inputX.join("+"));
    sumY = eval(inputY.join("+"));

    //calculating square of sum of x and y
    squareSumX = Math.pow(sumX, 2);
    squareSumY = Math.pow(sumY, 2);

    //calculating square of x
    squareX = [];
    for (k = 0;k < lengthX;k++) {
        squareX[k] = Math.pow(inputX[k], 2);
    };

    //calculating square of y
    squareY = [];
    for (l = 0;l < lengthY;l++) {
        squareY[l] = Math.pow(inputY[l], 2);
    };

    //calculating sum of square x and y
    sumSquareX = eval(squareX.join("+"));
    sumSquareY = eval(squareX.join("+"));

    //calculating length sum square of x and y
    lengthXSumSquareX = lengthX * sumSquareX;
    lengthYSumSquareY = lengthY * sumSquareY;

    //calculating length sum square minus sum of x and y
    lengthXSumSquareXMinusSquareSumX = lengthXSumSquareX - squareSumX;
    lengthYSumSquareYMinusSquareSumY = lengthYSumSquareY - squareSumY;

    //calculating length sum square minus sum of XY
    lengthXYSumSquareXYMinusSumXY = lengthXSumSquareXMinusSquareSumX * lengthYSumSquareYMinusSquareSumY;

    //calculating square root of length sum square minus sum of XY
    sqrtLengthXYSumSquareXYMinusSumXY = Math.sqrt(lengthXYSumSquareXYMinusSumXY);

    //calculating length x times sum of x
    lengthSumXY = lengthX * sumXY;

    //calculating sum of x times sum of y
    sumXSumY = sumX*sumY;

    //calculating length sum x minus sum of x and y
    lengthXSumXMinusSumXsumY = lengthSumXY - sumXSumY;

    //calculating the correlation coeficient
    r = lengthXSumXMinusSumXsumY / sqrtLengthXYSumSquareXYMinusSumXY;
};

//warning that the data doesn't meet the requierments
function warning() {
    console.log("Your data doesn't meet requierments");
    $("#fileLabel").removeClass("border-primary");
    $("#fileLabel").addClass("border-danger");
    $("#dataReq").removeClass("text-secondary");
    $("#dataReq").addClass("text-danger font-weight-bold");
    $("#details").addClass("d-none");
    $("#result").hide();
    $("#details-show").addClass("d-none");
    $("#warning").removeClass("d-none").show();
};

//showing the data result
function showResult() {
    //showing the data result
    $("#warning").hide();
    $("#result").show();
    $("#details-show").removeClass("d-none").show();
    console.log(inputX);
    document.getElementById("inputX").innerHTML = inputX.join("<p></p>");
    console.log(inputY);
    document.getElementById("inputY").innerHTML = inputY.join("<p></p>");
    console.log(lengthX);
    document.getElementById("lengthX").innerHTML = lengthX;
    console.log(lengthY);
    document.getElementById("lengthY").innerHTML = lengthY;
    console.log(inputXY);
    document.getElementById("inputXY").innerHTML = inputXY.join("<p></p>");
    console.log(sumXY);
    document.getElementById("sumXY").innerHTML = sumXY;
    console.log(sumX);
    document.getElementById("sumX").innerHTML = sumX;
    console.log(sumY);
    document.getElementById("sumY").innerHTML = sumY;
    console.log(squareSumX);
    document.getElementById("squareSumX").innerHTML = squareSumX;
    console.log(squareSumY);
    document.getElementById("squareSumY").innerHTML = squareSumY;
    console.log(squareX);
    document.getElementById("squareX").innerHTML = squareX.join("<p></p>");
    console.log(squareY);
    document.getElementById("squareY").innerHTML = squareY.join("<p></p>");
    console.log(sumSquareX);
    document.getElementById("sumSquareX").innerHTML = sumSquareX;
    console.log(sumSquareY);
    document.getElementById("sumSquareY").innerHTML = sumSquareY;
    console.log(lengthXSumSquareX);
    document.getElementById("lengthXSumSquareX").innerHTML = lengthXSumSquareX;
    console.log(lengthYSumSquareY);
    document.getElementById("lengthYSumSquareY").innerHTML = lengthYSumSquareY;
    console.log(lengthXSumSquareXMinusSquareSumX);
    document.getElementById("lengthXSumSquareXMinusSquareSumX").innerHTML = lengthXSumSquareXMinusSquareSumX;
    console.log(lengthYSumSquareYMinusSquareSumY);
    document.getElementById("lengthYSumSquareYMinusSquareSumY").innerHTML = lengthYSumSquareYMinusSquareSumY;
    console.log(lengthXYSumSquareXYMinusSumXY);
    document.getElementById("lengthXYSumSquareXYMinusSumXY").innerHTML = lengthXYSumSquareXYMinusSumXY;
    console.log(sqrtLengthXYSumSquareXYMinusSumXY);
    document.getElementById("sqrtLengthXYSumSquareXYMinusSumXY").innerHTML = sqrtLengthXYSumSquareXYMinusSumXY;
    console.log(lengthSumXY);
    document.getElementById("lengthSumXY").innerHTML = lengthSumXY;
    console.log(sumXSumY);
    document.getElementById("sumXSumY").innerHTML = sumXSumY;
    console.log(lengthXSumXMinusSumXsumY);
    document.getElementById("lengthXSumXMinusSumXsumY").innerHTML = lengthXSumXMinusSumXsumY;
    console.log(r);
    document.getElementById("r").innerHTML = r;
    document.getElementById("r-big").innerHTML = r.toFixed(8);
    $("#fileLabel").removeClass("border-danger text-danger");
    $("#fileLabel").addClass("border-primary");
    $("#dataReq").removeClass("text-danger font-weight-bold");
    $("#dataReq").addClass("text-secondary");
};

//copy to clipboard
function copy(selector){
    var $temp = $("<div>");
    $("body").append($temp);
    $temp.attr("contenteditable", true)
         .html($(selector).html()).select()
         .on("focus", function() { document.execCommand('selectAll',false,null); })
         .focus();
    document.execCommand("copy");
    $temp.remove();
};

//details button
$("#details-show").click(function() {
    $("#result").hide();
    $("#details").removeClass("d-none").show();
    $("#details-show").hide();
});
$("#details-hide").click(function() {
    $("#details").hide();
    $("#result").show();
    $("#details-show").show();
});
