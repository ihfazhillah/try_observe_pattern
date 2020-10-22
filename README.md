# Observe Pattern

Try to use observe pattern in javascript. I named it "Live Data". I borrow it from Android jetpack :D.

```javascript
var state = new LiveData("some_initial_state");

// listener
function logger(oldVal, newVal){
  console.log("old Value", oldVal);
  console.log("new Value", newVal);
}

// subscribe
state.subscribe(logger)

state.setValue("hello world");
state.setValue("this hello oworld again");

// unsubscribe
state.unsubscribe(logger);

state.setValue("this should not logged into console.");
```