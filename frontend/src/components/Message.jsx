import React from 'react'
import { Alert } from 'react-bootstrap'

function Message({variant, children}) {  // destructred from props
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}

export default Message
