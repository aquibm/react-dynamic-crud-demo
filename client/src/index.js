import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import Router from './router'

import 'bulma/css/bulma.css'
import './index.css'

ReactDOM.render(<Router />, document.getElementById('root'))
registerServiceWorker()
