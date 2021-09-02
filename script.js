var barsCount = 125;
var heights = [];
var sorted = false;

function makeBars() {
    for (let i = 1; i <= barsCount ; i++) {
        $("#sort-container").append("<div class='bar'></div>");
    }
}

makeBars();
var bars = $(".bar");

setRandomBars();

function setRandomBars() {
    heights = [];
    for (let i = 1; i <= barsCount ; i++) {
        heights.push(i * 3);
    }

    //Shuffle the bars
    async function shuffle(heights) {
        var currentIndex = heights.length,temporaryValue,randomIndex;
    
        // While there remain elements to shuffle...
        while (currentIndex !==0) {
        // Pick a random element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
    
        // And swap it with the current element.
        temporaryValue = heights[currentIndex];
        heights[currentIndex] = heights[randomIndex];
        heights[randomIndex] = temporaryValue;
        $(bars[currentIndex]).height(heights[currentIndex]);
        $(bars[randomIndex]).height(heights[randomIndex]);
        await timer(1);
        }
    
        for (let i = 0; i < bars.length; i++) {
            $(bars[i]).height(heights[i]);
        }
        return heights;
    }

    shuffle(heights);
}


function timer(ms) {
    return new Promise((res) => setTimeout(res, ms));
}

function swap(heights, first_Index, second_Index) {
  var temp = heights[first_Index];
  heights[first_Index] = heights[second_Index];
  heights[second_Index] = temp;
}

// BUBBLE SORT
async function bubbleSort(heights){
    var len = heights.length;
    for (var i = 0; i<len; i++){
      for(var j = 0; j<len-i-1; j++){
        if(ahead == false)
            return;
        if(heights[j]>heights[j+1]){
            var temp = heights[j+1];
            heights[j+1] = heights[j];
            heights[j] = temp;
            $(bars[j]).height(heights[j]);
            $(bars[j+1]).height(heights[j+1]);
            await timer(2);
         }
      }
    }
    return heights;
}

// QUICKSORT
async function quickSort(heights, left, right) {
  var index;
  if (heights.length > 1) {
    var pivot = heights[Math.floor((right + left) / 2)], //middle element as pivot
      i = left, //left pointer
      j = right; //right pointer
    while (i <= j) {
        if(ahead == false)
            return;
      while (heights[i] < pivot) {
        if(ahead == false)
        return;
        i++;
      }
      while (heights[j] > pivot) {
        if(ahead == false)
        return;
        j--;
      }
      if (i <= j) {
        swap(heights, i, j); //sawpping two elements
        $(bars[i]).height(heights[i]);
        $(bars[j]).height(heights[j]);
        await timer(10);
        i++;
        j--;
      }
    }

    index = i;

    if (left < index - 1) {
      //more elements on the left side of the pivot
      quickSort(heights, left, index - 1);
    }
    if (index+1 < right) {
      //more elements on the right side of the pivot
      quickSort(heights, index+1, right);
    }
  }
  return heights;
}

// SELECTION SORT
async function selectionSort(heights){
    var minIdx, temp, 
        len = heights.length;
    for(var i = 0; i < len; i++){
      minIdx = i;
      for(var  j = i+1; j<len; j++){
        if(ahead == false)
            return;
         if(heights[j]<heights[minIdx]){
            minIdx = j;
         }
      }
      temp = heights[i];
      heights[i] = heights[minIdx];
      heights[minIdx] = temp;
      $(bars[i]).height(heights[i]);
      $(bars[minIdx]).height(heights[minIdx]);
      await timer(50);
    }
    return heights;
}

// INSERTION SORT
async function insertionSort(heights){
    var i, len = heights.length, el, j;
  
    for(i = 1; i<len; i++){
      el = heights[i];
      j = i;
  
      while(j>0 && heights[j-1]>el) {
        if(ahead == false)
            return;
        heights[j] = heights[j-1];
        $(bars[j]).height(heights[j]);
        await timer(1);
        j--;
     }
  
     heights[j] = el;
     $(bars[j]).height(heights[j]);
     await timer(1);
    }
  
    return heights;
}  


//console.log(heights);

var ahead = false;

$("#init").click(function(e) {
    e.preventDefault();
    if(sorted)
        return;
    sorted = true;
    ahead = true;
    var option = $("#list").val();
    if(option == "bubble") {
        bubbleSort(heights);
    } else if(option == "insertion") {
        insertionSort(heights);
    } else if(option == "selection") {
        selectionSort(heights, 0, heights.length - 1);
    } else if(option == "quick") {
        quickSort(heights, 0, heights.length - 1);
    }  
    
});

$("#shuffle").click(function(e) {
    e.preventDefault();
    ahead = false;
    setRandomBars();
    sorted = false;
});