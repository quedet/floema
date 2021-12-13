// Third-Party Dependencies
const express = require('express')
const morgan = require('morgan')
const path = require('path')

// App Init
const app = express()
const PORT = process.env.PORT || 3000

// View Engine
app.set('view engine', 'pug')
app.set('views', path.resolve(__dirname, 'views'))

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.resolve(__dirname, 'public')))

// Routing
app.get('/', (req, res) => {
    res.render('pages/home')
})

app.get('/collection', (req, res) => {
    res.render('pages/collection')
})

app.get('/about', (req, res) => {
    res.render('pages/about')
})

// Server Listening
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}; Press Ctrl+C to terminate...`);
})