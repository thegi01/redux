/*
 * Data Flow
 */

/*
 * Redux architecture revolves around a strict unidirectional data Flow.
 * This means that all data in an application follows the same lifecycle pattern, 
 * making the logic of your app more predictable and easier to understand.
 * It also encourages data normalization, so that you don't end up with multiple, 
 * independent copies of the same data that are unaware of one another.
 */

/* The data lifecycle in any Redux app follows these 4 steps : 
 *
 * 1. You call store.dispatch(action).
 * An actions is a plain object describing what happend.
 * You can all store.dispatch(action) from anywhere in your app, including components and XHR callbacks, or even at scheduled intervals.
 *
 * 2. The Redux store calls the reducer function you gave it.
 * The store will pass two arguments to the reducer: the current state tree and the actions.
 * Note that a reducr is a pure function. It only computes the next state. It should be completely predictable: calling it with the same inputs many tiems should produce the same outputs. It shouldn't perform any side effects like API calls or router transitions. These shoud happen before an actions is dispatched.
 * 
 * 3. The root reducer many combine the output of multitple reducers into a single state tree.
 * How you structure the root reducer is completely up to you, Redux ships with a combineReducers() helper function, useful for "splitting" the root reducer into separate functions that each manage one branch of the state tree.
 * While combineReducers() is a handy helper utility, you don't have to uset it; feel tree to write your own root reducer!
 *
 * 4. The Redux store saves the complete state tree retuned by the root reducer.
 * This new tree is now the next state of your app! Every listener registered with store.subscribe(listener) will now be invoked; listeners may call store.getState() to get the current state.
 * Now, the UI can be updated to reflect the new state. if you use bidings like React Redux, this is the point at which component.setState(newState) is called.
 */


