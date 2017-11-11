const jsYaml = require('js-yaml');

function yaml(data, indent = 2) {
    return jsYaml.safeDump(data, { indend });
}

function unix(data) {
    if (typeof data === 'object' && data !== null) {
        if (Array.isArray(data)) {
            return data.join('\n');
        }
        return Object.keys(data).map(k => `${k}\t${data[k]}`).join('\n');
    }
    return String(data);
}

function json(data, indent) {
    switch(typeof data) {
    case 'number':
    case 'boolean':
    case 'string':
        return String(data);
    case 'object': // also includes null and arrays
        return JSON.stringify(data, undefined, indent);
    default:
        throw `Invalid data type (${typeof data}): ${data}`;
    }
}

// TODO support 'unix' and 'yaml|yml' too
// TODO add an option for pretty formatting the JSON objects
// TODO the format should by default be unix so it can be easier to use it in bash scripts

async function stringify(argv, data) {
    switch(argv.format) {
        case 'json':
            return json(data, await argv.file.indent().indent);
        case 'unix':
            return unix(data);
        case 'yaml':
            return yaml(data,  await argv.file.indent().amount);
        default:
            throw `Invalid format: ${format}`;
    }
}

function print(string) {
    console.log(string);
}

async function output(argv, data) {
    print(await stringify(argv, data));
}

module.exports = { unix, json, yaml, stringify, print, output };