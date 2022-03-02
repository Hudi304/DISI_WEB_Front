const { dashCase, lowercaseFirstLetter, getType, getApiImports } = require('./swagger-utils');

module.exports.extractApis = (jsonData, name, enums) => {
  let paths = jsonData.paths;
  let groups = groupApis(paths, name, enums);  
  return Object.keys(groups).map(key => {
    let methodsContent = groups[key].map(method => {
      let queryParams = ""
      if(method.queryParams.length) {
        queryParams = '?' + method.queryParams.map(item => item.name + '=${' + item.name +'}').join('&')
      }
      return `export const ${method.methodName} = (${[...method.parameters, ...method.headerParams].join(', ')}): Promise<${method.responseType}> => API().${method.method}(\`${method.path}${queryParams}\`${method.requestType ? ', body' : ""}${method.headerParams.length? ', {headers}': ""});\n`
    }).join('\n')
    let imports = groups[key].reduce((all, method) => all.concat(method.imports), []);
    imports = Array.from(new Set(imports)).join("");
    imports += `import { API } from "../api";\n`;

    let tsContent = `${imports}\n${methodsContent}`;

    return {
      name: dashCase(key),
      content: tsContent
    }
  });
}

function groupApis(paths, name, enums) {
  let groups = {}
  Object.keys(paths).forEach(path => {
    Object.keys(paths[path]).forEach(method => {
      let api = paths[path][method];
      let tag = api.tags? api.tags[0] : 'services';
      let requestContent = api.requestBody ? api.requestBody.content : undefined
      
      let requestType = requestContent ? getType((requestContent['application/json'] || requestContent['multipart/form-data'])?.schema) : 'null'
      let responseContent = (api.responses['200'] || api.responses['201'] || api.responses['204']).content;
      let responseType = responseContent ? getType(responseContent['application/json']?.schema) : 'null'
      let methodName = api.operationId.split('_').pop() + 'Api';
      let imports = getApiImports(paths[path][method], enums);
      methodName = lowercaseFirstLetter(methodName);
      groups[tag] = groups[tag] || [];

      let headerParams = api.parameters ? api.parameters.filter(param => param.in === 'header') : []
      let queryParams = api.parameters ? api.parameters.filter(param => param.in === 'query') : []
      let pathParams = api.parameters ? api.parameters.filter(param => param.in === 'path') : []

      if (api.operationId.includes('Image') && api.operationId.includes('Update')) {
        requestType = "FormData"
      }

      groups[tag].push({
        methodName,
        method,
        responseType,
        imports,
        requestType: requestType != 'null' ? requestType : undefined,
        path: path.replace(`/${name}`, "").replace(/{version}/gm, 'v1').replace(/{/gm, '${'),
        parameters: [...pathParams, ...queryParams].map(param => `${param.name}: ${getType(param?.schema)}`).concat(requestType != 'null' ? ['body: ' + requestType] : []),
        headerParams: headerParams.length? ['headers: {' + headerParams.map(param => `"${param.name}": ${getType(param?.schema)}`) + '}'] : [],
        queryParams
      })
    })
  })

  return groups
} 