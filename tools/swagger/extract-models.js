const { uppercaseFirstLetter, lowercaseFirstLetter, getType, getModelImports, isEnum } = require('./swagger-utils');

module.exports.extractModels = (jsonData, enums) => {
   let schemas = jsonData.components.schemas;

   return Object.keys(schemas).filter(key => schemas[key].type === 'object').map(key => {
      let list = '';
      let constructor = '\nconstructor(obj = {} as any) {\n  obj = obj || {};';
      let properties = schemas[key].properties;
      let imports = getModelImports(properties, enums);
      
      imports = Array.from(new Set(imports)).join('');

      if(properties) {
         Object.keys(properties).forEach(propKey => {
            let initValue = getInitValue(properties[propKey], propKey);

            if (initValue === '[]') {
               if (/[A-Z]/.test(getType(properties[propKey])[0]) && !isEnum(getType(properties[propKey]), enums)) {
                  constructor += `\n  this.${lowercaseFirstLetter(propKey)} = obj.${lowercaseFirstLetter(propKey)}?.filter((item: any) => item !== undefined).map((item: any) => new ${getType(properties[propKey]).split('[')[0]}(item)) || [];`;
               } else {
                  constructor += `\n  this.${lowercaseFirstLetter(propKey)} = obj.${lowercaseFirstLetter(propKey)} || [];`;
               }
            } else if ('number' === getType(properties[propKey])) {
               constructor += `\n  this.${lowercaseFirstLetter(propKey)} = obj.${lowercaseFirstLetter(propKey)} !== undefined && obj.${lowercaseFirstLetter(propKey)} !== null ? obj.${lowercaseFirstLetter(propKey)} : ${initValue};`;
            } else if (/[A-Z]/.test(getType(properties[propKey])[0]) && !isEnum(getType(properties[propKey]), enums)) {
               constructor += `\n  this.${lowercaseFirstLetter(propKey)} = !obj.${lowercaseFirstLetter(propKey)} ? new ${getType(properties[propKey]).split('[')[0]}() : new ${getType(properties[propKey]).split('[')[0]}(obj.${lowercaseFirstLetter(propKey)});`;
            } else {
               if (initValue !== undefined) {
                  let defaultValue = initValue !== 'undefined' ? initValue : '\'\'';
                  constructor += `\n  this.${lowercaseFirstLetter(propKey)} = obj.${lowercaseFirstLetter(propKey)} === null? ${defaultValue} : obj.${lowercaseFirstLetter(propKey)};`;
               } else {
                  constructor += `\n  this.${lowercaseFirstLetter(propKey)} = obj.${lowercaseFirstLetter(propKey)};`;
               }
            }
         });

         Object.keys(properties).forEach(propKey => {
            list += `\n  public ${lowercaseFirstLetter(propKey)}${properties[propKey].nullable ? '?' : ''}: ${getType(properties[propKey])} = ${getInitValue(properties[propKey], propKey)};`;
         });
      }
      let tsContent = `${imports}\nexport class ${uppercaseFirstLetter(key.split('.').pop())} {${list}${constructor}\n}\n\n}\n`;
      return {
         name: key.split('.').pop(),
         content: tsContent
      };
   });
}


function getInitValue(prop, name) {
   if (name.toLowerCase().endsWith('guid'))
      return undefined;

   switch (prop.type) {
      case 'integer':
      case 'number':
         return '""';
      case 'string':
         return '""';
      case 'boolean':
         return false;
      case 'array':
         return '[]';
      case 'array':
         return '[]';
   }

   if (prop.$ref) {
    let refName = prop.$ref.split('/').pop()
    return `{} as ${refName}`;
  }

  if (prop.allOf && prop.allOf[0].$ref) {
    let refName = prop.allOf[0].$ref.split('/').pop()
    return `{} as ${refName}`;
  }
}