import App from './App.js'

// components (custom web components)
import './components/va-app-header'
import './components/va-app-footer'
import './components/va-bottle-spinner'

// styles
import './scss/master.scss'

// app.init
document.addEventListener('DOMContentLoaded', () => {
  App.init()
})