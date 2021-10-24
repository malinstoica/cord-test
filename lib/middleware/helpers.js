import { Messages, ValidTypes } from "./constants";

export const typeCheck = (root, value) => {
    
    switch(root.type){
      case ValidTypes.number:
      case ValidTypes.integer:
        if(!isNaN(value)){
          break;
        }
  
      case ValidTypes.string:
        if(isNaN(value)){
          break;
        }
        throw new Error(constructErrorBody(Messages.malformedQuery, 400));
  
      case ValidTypes.boolean:
        if(typeof(value) === root.type){
          break;
        }
        throw new Error(constructErrorBody(Messages.malformedQuery, 400));
  
      case ValidTypes.object:
        if(typeof(value) === root.type && !Array.isArray(value)){
          if(root.required !== undefined && root.required in value){
            Object.keys(root.properties).forEach(prop => {
              typeCheck(root.properties[prop], value[prop])
            });
            break;
          }
        }
        throw new Error(constructErrorBody(Messages.malformedQuery, 400));
  
      case ValidTypes.array:
        if(Array.isArray(value)){
          value.forEach(entry => {
            typeCheck(root.items, entry);
          })
          break;
        }
        throw new Error(constructErrorBody(Messages.malformedQuery, 400));
      default:
        throw new Error(constructErrorBody(Messages.malformedQuery, 400));
    }
  }
  
export const constructErrorBody = (message, code) => {
    return JSON.stringify({
      statusCode: `${code}`,
      message: `${message}`
    })
  };
  