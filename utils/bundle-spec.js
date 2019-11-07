const fs = require("fs")
const { loadAndBundleSpec } = require("redoc")

const spec = process.argv[2] || "./specs/booking.yml"
const out = process.argv[3] || "./dist/specs/booking.json"

const main = async () => {
    console.info("Loading", spec)
    const json = await loadAndBundleSpec(spec)
    console.info("Writing", out)
    fs.writeFileSync(out, JSON.stringify(json, null, 2))
}

main()
