/* Redux Example : Todolist
    https://redux.js.org/basics/example
*/

/* Entry Point */

// index.js

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import App from './components/App'

const store = createStore(rootReducer)

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)




/* Actions Creators */

// actions/index.js

let nextTodoId = 0

export const addTodo = text => ({
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
})

export const setVisibilityFilter = filter => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
})

export const toggleTodo = id => ({
    type: 'TOGGLE_TODO',
    id
})

export const VisibilityFiters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}







/* Reducers */

// reducers/todo.js
const todos = (state = [], action) => {
    switch(action.type){
        case 'ADD_TODO':
            return[
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]
        case 'TOGGLE_TODO':
            return state.map(todo =>
                todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
            )
        default:
            return state
    }
}

export default todos

// reducers/visiblityFilter.js
import { VisibilityFilters } from '../actions'

const visibilityFilter = (state = visibilityFilters.SHOW_ALL, action) => {
    switch(action.type){
        case 'SET_VISIBILITY_FILTER':
            return action.filter
        default:
            return state
    }
}

export default visibilityFilter



// reducers/index.js
import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
    todos,
    visibilityFilter
})





/* Presentational Components */

// components/Todo.js
import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ onClick, completed, text }) => (
    <li 
        onClick={onClick}
        style={{
            textDecoratioin: completed? 'line-through' : 'none'
        }}
    >
        {text}
    </li>
)

Todo.propTypes = {
    onClick: Proptypes.func.isRequired,
    completed: Proptypes.bool.isRequired,
    text: Proptypes.string.isRequired
}

export default Todo


// components/TodoList.js
import React from 'react'
import PropTypes from 'prop-types'
import Todo from './todo'

const TodoList = ({ todos, toggleTodo }) => (
    <ul>
        {todos.map(todo => (
            <Todo key={todo.id} {...todo} onClick={()=>toggleTodo(todo.id)} />
        ))}
    </ul>
)

TodoList.propTypes = {
    todos: Proptypes.arrayOf(
        PropTypes.shape({
            id: propTypes.number.isRequired,
            completed: PropTypes.bool.isRequired,
            text: Proptypes.string.isRequired
        }).isRequired
    ).isRequired,
    toggleTodo: Proptypes.func.isRequired
}

export default TodoList



// components/Link.js

import React from 'react'
import Proptypes from 'prop-types'

const Link = ({ active, children, onClick }) => (
    <button 
        onClick={onClick}
        disabled={active}
        style={{
            marginLeft: '4px'
        }}
    >
    {children}
    </button>
)

Link.propTypes = {
    active: PropTypes.bool.isRequired,
    children: Proptypes.node.isRequired,
    onClick: Proptypes.func.isRequired
}

export default Link



// components/Footer.js
import React from 'react'
import FilterLink from '../containers/FilterLink'
import { VisibilityFilters } from '../actions'

const Footer = ()=> (
    <div>
        <span>Show: </span>
        <FilterLnik filter={VisibilityFilters.SHOW_ALL}>ALL</FilterLnik>
        <FilterLnik filter={VisibilityFilters.SHOW_ACTIVE}>Actuve</FilterLnik>
        <FilterLnik filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterLnik>
    </div>
)

export default footer



// components/App.js
import React from 'react'
import Footer from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
    <div>
        <Addtodo />
        <VisibleTodoList />
        <Footer />
    </div>
)

export default App





/* Container components */

// containers/VisibleTodoList.js

import { connect } from 'react-redux'
import { toggleTodo } from '../actons'
import TodoList from '../components/TodoList'
import { VisibilityFilters } from '../actions'

const getVisibleTodos = (todos, filter) => (
    switch(filter){
        case VisibilityFilters.SHOW_ALL:
            return todos
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(t => t.completed)
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(t => !t.completed)
        default:
            throw new Error('Unknown filter:' + filter)
    }
)

const mapStateToProps = state => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
})

const mapDispatchToProps = dispatch => ({
    toggleTodo: id => dispatch(toggleTodo(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)




// containers/FilterLink.js

import { connect } from 'react-redux'
import { setVisiblityFilter } from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Link)


/* Other Components */

// containers/AddTodo.js
import React from 'react'
import { connect } from 'rect-redux'
import [ addTodo ] from '../actions'

const AddTodo = ({ dispatch }) => (
    let input

    return(
        <div>
            <form
                onSubmit={e=>{
                    e.preventDefault()
                    if(!input.value.trim()){
                        return
                    }
                    dispatch(addTodo(input.value))
                    input.value = ''
                }}
            >
                <input ref={node => (input = node)} />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    )
)

export default connect()(AddTodo)


