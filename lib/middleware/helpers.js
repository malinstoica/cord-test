import { Messages, ValidTypes } from "./constants";

/**
 * Helper function to validate a value's type, given a required type and request data.
 * Will automatically recurse on itself if an array/object is found and there is 
 * available type information for the items/properties in the root schema
 * 
 * @throws throw an error code with a relevant error message
 * 
 * @param {object} root schema object for the parameters it will check the value for 
 * @param {object} value request data that needs to be validated
 */
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
        if(root.required !== undefined && !(root.required in value)){
            throw new Error(constructErrorBody(Messages.malformedQuery, 400));
        }
        if(typeof(value) === root.type && !Array.isArray(value)){
            Object.keys(root.properties).forEach(property => {
              typeCheck(root.properties[property], value[property])
            });
            break;
        }
        throw new Error(constructErrorBody(Messages.malformedQuery, 400));
  
      case ValidTypes.array:
        
        if(!Array.isArray(value)){
            typeCheck(root.items, value);
            break;
        } else if(Array.isArray(value)){
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
  