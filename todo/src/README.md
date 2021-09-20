### Application flow (search, list and app)

React application and its components start with an initial state, which may be passed down as props to other components.

It’s rendered for the first time as a UI. Once a side-effect occurs, like user input or data loading from a remote API, the change is captured in React’s state. Once state has been changed, all the components affected by the modified state or the implicitly modified props are re-rendered (the component functions runs again).

UI awaits side-effects like user interactions. Once state is changed (e.g. current state changed via state updater function from useState), all components affected by modified state/props render again.

Hooks are only intialised at start and will not be re-initialized after re-render.
