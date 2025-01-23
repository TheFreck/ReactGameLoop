# [ReactGameLoop](https://reactgameloopserver20250114154525.azurewebsites.net/)

This project is a template for animated games in its most basic form.

It has three components that work together to progress through successive frames.

### App.jsx
When App.jsx initializes it generates an AppId which is a random number between 1-111. It stores this in state and passes it to the LoopContainer

### LoopContainer.jsx
The LoopContainer lives outside the loop and contains the Start/Stop button. It also contains a loopRef to store game data which it passes to those components that need it: 
<pre>
{
  loopId: appId,
  loopFrame: 0,
  intId: 0,
  isRunning: false,
  isCopmlete: false,
  data: {}
}
</pre>
In a more sophisticated game the data object would contain specific information about the game.

### LoopMechanism
Every time the loop starts or stops in the LoopContainer the LoopMechanism gets re-rendered. It receives the loopRef as a prop. If `loopRef.current.isRunning` is true then this component calls the js function `setInterval` which in turn calls the `march` function which has a callback to deliver calculation results from the frame. The march function reaches out to the `loopHelpers.jsx` which iterates the frame number and calls the server. Since this is only a proof of concept the server responds with an `OK` result of `"You Got Me"`. A more sophisticated game will receive a new game state with each call.

### LoopBody
The loopBody simply displays the frame number. A more sophisticated game will replace this file with the outermost layer of the application.
