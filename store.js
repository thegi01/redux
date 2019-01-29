/*
 * Store
 */

/*
 * Actions : represet the facts about "what happend".
 * Reducers : update the state according to those actions.
 * The store has the follwing responsibilities.
 * - Holds application state;
 * - Allows access to state via getState();
 * - Allows state to be updated via dispatch(action);
 * - Regiters linstener via subscribe(listener);
 * - Handles unregistering of linsteners via the function returned by subscribe(listener).
 */

// createStore()

import { createStore } from 'redux';
import todoApp from './reducers'
const store = createStore(todoApp)

// optinally specify the initial state as the second argument to createStore()
// This is useful for hydrating the state the client to macth the state of a Redux applicaton running on the server.

const store = createStore(todoApp, widnow.STATE_FROM_SERVER)



/* Dispatching Actions */
import{
    addTodo,
    toggleTodo,
    setVisibilityFilter,
    VisibilityFilter
} from './actions'

// Log the initial state
console.log(store.getState())

// Every time the state changes, log is
// Note that subcribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe( () => console.log(store.getState()) )

// Dispatch same actions
store.dispatch(addTodo('Learn about actions'))
store.dispatch(addTodo('Learn about reducers'))
store.dispatch(addTodo('Learn about store'))
store.dispatch(toggleTodo(0))
store.dispatch(toggleTodo(1))
store.dipatch(setVisibilityFilter(VisibilityFilter.SHOW_COMPLETED)

// Store listening to state updates
unsubscribe()



/*
 * Source Code
 * index.js
 */

import { createStore } from 'redux'
import todoApp from './reducers'

const store = createStore(todoApp)