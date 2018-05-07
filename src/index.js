import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import globalStyles from 'styles/globalStyles'

import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
globalStyles()
