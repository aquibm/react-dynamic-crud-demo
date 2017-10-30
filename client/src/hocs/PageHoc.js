import React from 'react'
import Navbar from 'components/Navigation'

import './pageHoc.css'

export default WrappedComponent => props => (
    <div>
        <Navbar />
        <div className="page">
            <WrappedComponent {...props} />
        </div>
    </div>
)
