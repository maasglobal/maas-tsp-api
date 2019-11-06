const express = require('express')
const app = express()
const swaggerUi = require('swagger-ui-express');
const fs = require("fs")
const path = require("path")
const { loadAndBundleSpec } = require("redoc")

var options = {
    explorer: true,
    swaggerOptions: {
        urls: fs.readdirSync("./specs").filter(f => f.endsWith(".yml")).map(f => ({
            url: "/specs/" + f,
            name: path.basename(f)
        }))
    }
};

const ajv = require('maas-schemas').init()

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
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(null, options));
app.use('/redoc', express.static('./node_modules/redoc/bundles'))
app.listen(process.env.PORT || 3000)
