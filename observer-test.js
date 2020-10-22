function LiveData(initial){
  this.value = initial;
  this.subscriber = [];
}

LiveData.prototype.subscribe = function(fn){
  this.subscriber.push(fn);
}

LiveData.prototype.unsubscribe = function (fnToRemove) {
  this.subscriber = this.subscriber.filter(function (fn) {
    return fn !== fnToRemove;
  });
}

LiveData.prototype.setValue = function(value){
  var oldValue = this.value;

  this.subscriber.forEach(function (fn) {
    fn(oldValue, value);
  });

  this.value = value;
}


var BUTTON_STATE = {
  notSelected: 1,
  partialSelected: 2,
  allSeelcted: 3
}

var buttonState = new LiveData(BUTTON_STATE.notSelected);

// listeners
function logger(oldValue, newValue){
  console.log("Old Value: ", oldValue);
  console.log("New Value: ", newValue);
}

function buttonView(oldValue, newValue){
  var text;
  if (newValue === BUTTON_STATE.notSelected || newValue === BUTTON_STATE.partialSelected){
    text = "Select All";
  } else {
    text = "Deselect All";
  }

  $("#select-all").text(text);
}

buttonState.subscribe(logger)
buttonState.subscribe(buttonView)

$("[name='students']").change(function(){
  var students = $("[name='students']").toArray();
  var arrayLength = students.length;
  var checkedTotal = students.reduce(function(prev, curr){
    return prev + (curr.checked ? 1: 0);
  }, 0)

  if (checkedTotal === 0){
    buttonState.setValue(BUTTON_STATE.notSelected);
  } else if (checkedTotal === arrayLength){
    buttonState.setValue(BUTTON_STATE.allSeelcted);
  } else {
    buttonState.setValue(BUTTON_STATE.partialSelected);
  }
})

$("#select-all").click(function (){
 var value = buttonState.value;
 if (value === BUTTON_STATE.allSeelcted){
   // deselect all
   $("[name='students']").prop("checked", false);
   buttonState.setValue(BUTTON_STATE.notSelected);

 } else {
   // select all
   $("[name='students']").prop("checked", true);
   buttonState.setValue(BUTTON_STATE.allSeelcted);
 }
});

