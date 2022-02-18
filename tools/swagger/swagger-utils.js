module.exports.lowercaseFirstLetter = (string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

module.exports.uppercaseFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports.dashCase = (string) => {
  let s = string.charAt(0).toLowerCase() + string.slice(1);
  return s.replace(/([A-Z])/gm, '-$1').toLowerCase();
}

module.exports.getType = getObjectType;

module.exports.isEnum = isEnum;

function getObjectType(prop) {
  switch (prop.type) {
    case 'integer':
    case 'number':
      return 'number | string';
    case 'object':
      return 'any';
    case 'boolean':
    case 'string':
      return prop.type;
    case 'array':
      return `${getObjectType(prop.items)}[]`;
    case 'formData': 
      return 'FormData';
  }

  if (prop.$ref) {
    let refName = prop.$ref.split('/').pop()
    return refName;
  } else if (prop.allOf && prop.allOf[0].$ref) {
    let refName = prop.allOf[0].$ref.split('/').pop()
    return refName;
  } else {
    return 'any';
  }
}

module.exports.getApiImports = (data, enums) => {
  let imports = []
  let ref;

  if (data.requestBody) {    
    ref = getRef(data.requestBody.content);   
    if (ref) {
      imports.push(parseApiImport(ref, enums))
    }
  } 

  if (data.parameters) {
    data.parameters.forEach(param => {
      ref = getRef(param);
      if (ref) {
        imports.push(parseApiImport(ref, enums))
      }
    })
  } 


  let responseContent = (data.responses['200'] || data.responses['201'] || data.responses['204']).content
  if (responseContent) {
    let ref = getRef(responseContent);
    if (ref) {
      imports.push(parseApiImport(ref, enums))
    }
  } 

  return imports;
}

function parseApiImport(ref, enums) {  
  if (isEnum(ref, enums)) {
    return `import { ${ref} } from 'common/enums/${ref}.enum';\n`
  } else {
    return `import { ${ref} } from 'common/models/${ref}';\n`;
  }
}

module.exports.getModelImports = (data, enums) => {
  let imports = [];
  if(data) {
    Object.keys(data).forEach(key => {
      let ref = getRef(data[key])
      if (ref) {
        if (isEnum(ref, enums)) {
          imports.push(`import { ${ref} } from 'common/enums/${ref}.enum';\n`)
        } else {
          imports.push(`import { ${ref} } from './${ref}';\n`)
        }
      }
    })
  }
  return imports
}

function isEnum(ref, enums) {
  let cleanRef = ref.replace(/[\[\]]/g, '')
  return enums && enums.find(enu => enu.name === cleanRef)
}

function getRef(content) {
  if (content['application/json']) {
    return getRef(content['application/json'].schema)
  }

  if (content.allOf) {
    return getRef(content.allOf[0])
  }

  if (content.schema) {
    return getRef(content.schema)
  }

  if (content.type === 'array') {
    return getRef(content.items)
  }

  if (content.$ref) {  
    console.log(content);  
    return content.$ref.split('/').pop();
  } else {
    return undefined;
  }
}