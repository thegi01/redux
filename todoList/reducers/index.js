import { combineReducers } from 'redux'
import todos from './todos'
import visibiltyFilter from './visibiltyFilter'

export default combineReducers({
    todos,
    visibiltyFilter
})