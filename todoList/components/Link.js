import React from 'react'
import PropTypes form 'prop-types'

const Link = ({ active, children, onClick }) => (
    <button
        onClick={onClick}
        diabled={active}
        style={{
            marginLeft: '4px'
        }}
    >
        {children}
    </button>
)

Link.PropTypes = {
    active: PropTypes.bool.isRequried,
    children: PropTypes.node.isRequried,
    onClick: PropTypes.func.isRequried
}

export default Link