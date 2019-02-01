/*
 * Reducers
 * https://redux.js.org/basics/reducers
 * Reducers specify how the application's state changes in respose to actions sent to the store.
 */


/*
 * Designing the State Shape
 * Try to keep the data separate fromth UI state.
 */

{
    visibilityFilter: 'SHOW_ALL',
    todos: [
        {
            text: 'Consider using Redux',
            completed: true
        },
        {
            text: 'Keep all state in a single tree',
            completed: false
        }
    ]
}


/*
 * Handling Actions
 * The reducer is a pure function that takes the previous state and an action, and returns the next state.
 */

(previousState, actions) => newState

/* It's called a reducer because it's the type of function you would paa to Array.prototype.reduce(reducer, ?initialValue).
 * Given the same arguments, i should calculate the next state and return it. No suprises. No side effects. NO API calls. No mutations. Just a calculation.
 */

// Specify the initial state

import { VisibilityFilters } form './actions'

const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
}

function todoApp(state, action){
    if(typeof state === 'undefined'){
        return initialState
    }

    // For now, don't handle any actions
    // and just return the state given to us.
    return state
}

// ES6 default arguments syntax
function todoApp(state = intialState, action){
    // For now, don't handle any actions
    // and just return the state given to us.
    return state
}

// Handle SET_VISIBILITY_FILTER
function todoApp(state = initialState, action){
    switch(action.type){
        case SET_VISIBILITY_FILTER:
            return Object.assign({}, state, {
                visibilityFilter: action.filter
            })
        default:
            return state
    }
}


/*
 * Handling More Actions
 * Import the ADD_TODO and TOGGLE_TODO actions and then extend our reducer to handle ADD_TODO.
 */
import {
    ADD_TODO,
    TOGGLE_TODO,
    SET_VISIBILITY_FILTER,
    VisibilityFilters
} from './actions'

...

function todoApp(state = initialState, action){
    switch(action.type){
        case SET_VISIBILITY_FILTER:
            return Object.assign({}, state, {
                visibilityFilter: action.fiter
            })
        case ADD_TODO:
            return Object.assign({}, state, {
                todos: [
                    ...state.todos,
                    {
                        text: action.text,
                        completed: false
                    }
                ]
            })
        case TOGGLE_TODO:
            return Object.assign({}, state, {
                todos: state.todos.map((todo, index)=>{
                    if(index === action.index){
                        return Object.assign({}, todo, {
                            completed: !todo.completed
                        })
                    }
                    return todo
                })
            })
        default:
            return state
    }
}

/*
 * Splitting Reducers
 */

function todoApp(state = initialState, action){
    switch(action.type){
        case SET_VISIBILITY_FILTER:
            return Object.assign({}, state, {
                visibilityFilter: action.filter
            })
        case ADD_TODO:
            return Object.assign({}, state, {
                todos: [
                    ...state.todos,
                    {
                        text: action.text,
                        completed: false
                    }
                ]
            })
        case TOGGLE_TODO:
            return Object.assign({}, state, {
                todos: state.todos.map( (todo, index)=> {
                    if(index === action.index){
                        return Object.assign({}, todo, {
                            completed: !todo.completed
                        })
                    }
                    return todo
                })
            })
        default:
            return state
    }
}

// Is there a way to make it easier to comrehend?
// It seems like todos and visibilityFilter are updated completely independently.

function todos(state=[], action){
    switch(action.type){
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ]
        case TOGGLE_TODO:
            return state.map((todo, index)=>{
                if(index === action.index ){
                    return Object.assign({}, todo, {
                        completed: !todo.completed
                    })
                }
                return todo
            })
        default:
            return state
    }
}

function todoApp(state = initialState, action){
    switch(action.type){
        case SET_VISIBILITY_FILTER:
            return Object.assign({}, state, {
                visibilityFilter: action.filter
            })
        case ADD_TODO:
            return Object.assign({}, state, {
                todos: todos(state.todos, action)
            })
        case TOGGLE_TODO:
            return Object.assign({}, state, {
                todos: todos(state.todos, action)
            })
        default:
            return state
    }
}



//  Manage visibilityFilter

const { SHOW_ALL } = visibilityFilters

function visibilityFilter(state = SHOW_ALL, action){
    switch(action.type){
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}






function todos(state=[], action){
    switch(action.type){
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ]
        case TOGGLE_TODO:
            return state.map((todo, index)=>{
                if(index ===action.index ){
                    return Object.assign({}, todo, {
                        completed: !todo.completed
                    })
                }
                return todo
            })
        default:
            return state
    }
}

function visibilityFilter(state = SHOW_ALL, action){
    switch(action.type){
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

function todoApp(state = {}, action){
    return{
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        todos: todos(state.todos, action)
    }
}

// Note that each of these reducers is managing its own part of the global state.
// The state parameter is defferent for every reducer, and crresponds to the part of the stateit manages.


// combineReducers

import { combineReducers } from 'redux'

const todoApp = combineReducers({
    visibilityFilter,
    todos
})

export default todoApp

// Not tha this is equivalent to:

export default function todoApp(state={}, action){
    return {
        visibilityFilter: visibilityFilter(state.visibilityFilter, action),
        todos: todos(state.todos, action)
    }
}

// You could also give them differend keys, or call functions dirrerently.
// These two way to write a combined reducer are equiavlent

const reducer = combineReducers({
    a: doSomethingWithA,
    b: processB,
    c: c
})

function reducer(state={}, action){
    return{
        a: doSomethingWithA(state.a, action),
        b: processB(state.b, action),
        c: c(state.c, action)
    }
}

// ES6

import { combineReducers } from 'redux'
import * as reducers form './reducers'

const todoApp = combineReducers(reducers)



/*
 * Source Code
 * reducers.js
 */

import { combineReducers } from 'redux'
import {
    ADD_TODO,
    TOGGLE_TODO,
    SET_VISIBILITY_FILTER,
    VisibilityFilters
} from './actions'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action){
    switch(action.type){
        case SET_VISIBILITY_FILTER:
            return action.filter
        default:
            return state
    }
}

function todos(state = [], action){
    switch(action.type){
        case ADD_TODO:
            return [
                ...state,
                {
                    text: action.text,
                    completed: false
                }
            ]
        case TOGGLE_TODO:
            return state.map((todo, index) => {
                if( index === action.index ){
                    return Object.assign({}, todo, {
                        completed: !todo.completed
                    })
                }
                return todo
            })
        default:
            return state
    }
}

const todoApp = combineReducers({
    visibilityFilter,
    todos
})

export default todoApp

