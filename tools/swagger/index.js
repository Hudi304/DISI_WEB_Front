const https = require("https")
const rimraf = require('rimraf');
const mkdirp = require('mkdirp');
const argv = require('yargs').argv;
const fs = require('fs');
const getDirName = require('path').dirname;
const { extractEnums } = require('./extract-enums');
const { extractModels } = require('./extract-models')
const { extractApis } = require('./extract-apis')

const ROOT = "src";
const ENUMS = "common/enums";
const MODELS = "common/models";
const APIS = "api/endpoints";
const SWAGGER_JSON = require('../../swagger.json')

const ENVIRONMENT = argv.env || 'dev';

let host = `next-gen-${ENVIRONMENT}-api.azurewebsites.net`;
let apis = [{
  name: '',
  path: '/swagger/v1/swagger.json'
}]

let apiCount = 0;
apis.forEach(api => extractFiles(api, () => {
  apiCount++
  if (apiCount === apis.length) {
    rimraf(`${ROOT}/${ENUMS}`, () => {
      mkdirp(`${ROOT}/${ENUMS}`);
      apis.reduce((all, api) => all.concat(api.enums), []).forEach(item => {
        writeFile(`${ROOT}/${ENUMS}/${item.name}.enum.ts`, item.content, () => { })
      })
    })

    rimraf(`${ROOT}/${MODELS}`, () => {
      mkdirp(`${ROOT}/${MODELS}`);
      apis.reduce((all, api) => all.concat(api.models), []).forEach(item => {
        writeFile(`${ROOT}/${MODELS}/${item.name}.ts`, item.content, () => { })
      })
    })

    apis.forEach(value => {
      rimraf(`${ROOT}/${APIS}/${value.name}`, () => {
        mkdirp(`${ROOT}/${APIS}/${value.name}`);
        value.apis.forEach(item => {
          writeFile(`${ROOT}/${APIS}/${value.name}/${item.name}.api.ts`, item.content, () => { })
        })
      })
    })

     apis.forEach(value => {
      rimraf(`${ROOT}/${APIS}/${value.name}`, () => {
        mkdirp(`${ROOT}/${APIS}/${value.name}`);
        value.apis.forEach(item => {
          writeFile(`${ROOT}/${APIS}/${value.name}/${item.name}.api.ts`, item.content, () => { })
        })
      })
    })
  }
}))

function extractFilesFromJSON(api, cb) {
  let parsed = SWAGGER_JSON;
  api.enums = extractEnums(parsed)
  api.models = extractModels(parsed, api.enums)
  api.apis = extractApis(parsed, api.name, api.enums)
  cb();
}

function extractFiles(api, cb) {
  https.get({
    host,
    path: api.path
  }, response => {
    let body = ''
    response.on('data', (d) => {
      body += d;
    });
    response.on('end', () => {
      let parsed = JSON.parse(body);
      api.enums = extractEnums(parsed)
      api.models = extractModels(parsed, api.enums)
      api.apis = extractApis(parsed, api.name, api.enums)
      cb();
    })
  });
}

function writeFile(path, data, cb) {
  mkdirp(getDirName(path), function (err) {
    if (err)
      return cb(err);

    fs.writeFile(path, data, cb);
  });
}

function readFile(path, cb) {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) throw err;
    cb(data);
  });
}



