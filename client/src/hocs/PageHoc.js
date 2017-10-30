import React from 'react'
import Navbar from 'components/Navigation'

import './pageHoc.css'

export default WrappedComponent => () => (
    <div>
        <Navbar />
        <div className="page">
            <WrappedComponent />
        </div>
    </div>
)
