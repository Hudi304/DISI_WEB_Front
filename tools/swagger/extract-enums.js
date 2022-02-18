const { uppercaseFirstLetter } = require('./swagger-utils');

module.exports.extractEnums = jsonData => {
  let schemas = jsonData.components.schemas;
  return Object.keys(schemas).filter(key => schemas[key].enum).map(key => {
    let list = "";
    schemas[key].enum.forEach((res, index) => {
      list += `\n  ${schemas[key]['x-enumNames'][index]} = ${res}${index < schemas[key].enum.length - 1? ',': "" }`
    })
    let tsContent = `export enum ${uppercaseFirstLetter(key)} {${list}\n}\n`;
    return { 
      name: key,
      content: tsContent 
    }
  });  
}

// module.exports.extractEnums = jsonData => {
//   let schemas = jsonData.components.schemas;
//   let enums = []

//   Object.keys(schemas).forEach(key => {
//     Object.keys(schemas[key].properties).forEach(propKey => {
//       if (schemas[key].properties[propKey].enum) {
//         let list = "";
//         schemas[key].properties[propKey].enum.forEach((res, index) => {
//           list += `\n  ${res} = "${res}"${index < schemas[key].properties[propKey].enum.length - 1 ? ',' : ""}`
//         })
//         tsContent = `export enum ${key + uppercaseFirstLetter(propKey)} {${list}\n}\n`;

//         enums.push({
//           name: key + uppercaseFirstLetter(propKey),
//           content: tsContent
//         })
//       }
//     })
//   })
//   return enums;
// }

// const { uppercaseFirstLetter, dashCase } = require('./swagger-utils');

// module.exports.extractEnums = jsonData => {
//   let schemas = jsonData.components.schemas;
//   return Object.keys(schemas).filter(key => schemas[key].enum).map(key => {
//     let list = "";
//     schemas[key].enum.forEach((res, index) => {
//       //   list += `\n  ${schemas[key]['x-enumNames'][index]} = ${schemas[key].enum[index]}${index < schemas[key].enum.length - 1? ',': "" }`
//       list += `\n  Value${schemas[key].enum[index]} = ${schemas[key].enum[index]}${index < schemas[key].enum.length - 1 ? ',' : ""}`
//     })
//     tsContent = `export enum ${uppercaseFirstLetter(key)} {${list}\n}\n`;
//     return {
//       name: key,
//       content: tsContent
//     }
//   });
// }