import React from 'react'
import PropTypes from 'prop-types'

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
    active: PropTypes.bool.isRequried,
    children: PropTypes.node.isRequried,
    onClick: PropTypes.func.isRequried
}

export default Link