import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux'

import Counter from './Counter'
import reducer from './reducers'

const store = createStore(reducer)

const action = type => store.dispatch({type})

render(
    <Counter
        value={store.getState()}
        onIncrement={()=>action('INCREMENT')}
        onDecrement={()=>action('DECREMENT')} />, 
    document.getElementById('root')
)

store.subscribe(render)


