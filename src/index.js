const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const path = require("path")
const { loadAndBundleSpec } = require("redoc")

app.use('/', express.static('docs'))
app.use('/assets', express.static('assets'))
app.use('/specs', express.static('specs'))
// FIXME: dynamically bundle all yml files, not only booking.yml
app.get('/specs/booking.json', async (req, res) => {
    const spec = await loadAndBundleSpec("./specs/booking.yml")
    res.json(spec)
})
app.use('/examples', express.static('examples'))
app.use('/schemas', express.static('schemas'))
app.use('/swagger-ui', express.static(path.resolve(__dirname, '../node_modules/swagger-ui-dist')))
app.use('/redoc.standalone.js', async (req, res) => res.sendFile(path.resolve(__dirname, '../node_modules/redoc/bundles/redoc.standalone.js')))
app.listen(process.env.PORT || 3000)
