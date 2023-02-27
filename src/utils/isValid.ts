/**
 * Function to check if Object is valid or not
 * @param obj Object to be checked
 * @param values Array to be matched
 * @returns boolean
 */

const isValid = (obj: object, values: Array<string>) => {
    let result = true;
    const objValue = Object.values(obj);
    for (let i = 0; i < objValue.length; i += 1) {
      const element = objValue[i];
      if (typeof element === 'string' && element?.trim().length === 0) {
        result = false;
        return result;
      }
    }
  
    const arr: Array<string> = Object.keys(obj);
    const m = new Map();
    for (let i = 0; i < arr.length; i += 1) {
      const value = m.get(i);
      if (value === undefined) {
        m.set(arr[i], 1);
      } else {
        m.set(arr[i], value + 1);
      }
    }
    for (let i = 0; i < values.length; i += 1) {
      m.set(values[i], m.get(values[i]) - 1);
    }
    m.forEach((value: number) => {
      if (value !== 0) {
        result = false;
      }
    });
    return result;
  };
  
  export default isValid;
  