/**
 * Copy schemas locally and make them referencable in Open API specification
 * by replacing remote paths with relative paths.
 */
const fs = require('fs');
const path = require('path');

function copyFolderRecursiveSync(source, target, reader) {
    if (!fs.existsSync(source)) {
        throw new Error("Not found: " + source)
    }

    const stat = fs.lstatSync(source)
    if (stat.isDirectory()) {
        if (!fs.existsSync(target)) {
            fs.mkdirSync(target);
        }

        const files = fs.readdirSync(source);
        files.forEach(function (file) {
            var curSource = path.join(source, file);
            var curTarget = path.join(target, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, curTarget, reader);
            } else {
                fs.writeFileSync(curTarget, reader ? reader(curSource, curTarget) : fs.readFileSync(curSource));
            }
        });
    }
}

const rootSource = process.argv[2] || "./node_modules/maas-schemas/schemas"
const rootDest = process.argv[3] || "./schemas"

// FIXME: use dependency ffs
copyFolderRecursiveSync(rootSource, rootDest, (f) => {
    if (f.endsWith(".json")) {
        // Produce relative to the root folder path for a schemas
        const paths = path.resolve(f).substring(path.resolve(rootSource).length + 1).split("/")
        const dots = paths.map(p => "..").join("/")
        let str = fs.readFileSync(f, { encoding: "utf-8" })
        // Fix schema $id
        str = str.replace('"$id": "http://maasglobal.com/core/booking.json#",', '"$id": "http://maasglobal.com/core/booking.json",')
        // Reference locally, relative
        str = str.replace(/\"\$ref\": \"http:\/\/maasglobal.com/g, '"$ref": "' + dots + '/schemas')
        return str;
    } else {
        return fs.readFileSync(f)
    }
})

