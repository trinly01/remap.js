async function remap(arr, keyMap, iterator) {
  const newArr = []

  for (const item of arr) {
    const mappedItem = {};
    for (const key in keyMap) {
      const sourceKey = keyMap[key];
      const sourceKeyParts = sourceKey.split('.');
      let value = item;

      for (const part of sourceKeyParts) {
        if (value === undefined) {
          value = undefined; // Ensure undefined values are preserved
          break;
        }

        if (part.includes('[')) {
          const [arrayKey, index] = part.match(/([^[]*)\[(\d+)\]/).slice(1);
          value = value[arrayKey][parseInt(index, 10)];
        } else {
          value = value[part];

        }
      }

      notate(key, value, mappedItem);
    }

    if (iterator) {
      await iterator(mappedItem)
    }

    newArr.push(mappedItem);
  };

  return newArr
}

function notate(notation, value, result) {
  let currentObj = result || {};

  if (typeof notation === 'object') {
    let tempObj = value || {};
    for (const key in notation) {
      notate(key, notation[key], tempObj)
    }
    return tempObj
  }

  const keys = notation.split('.');
  

  

  if (keys.length === 1) {
    currentObj[keys[0]] = value
  } else {
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const isArray = key.includes('[');

      if (isArray) {
        const [arrayKey, arrayIndex] = key.match(/([^[]*)\[(\d+)\]/).slice(1);
        currentObj[arrayKey] = currentObj[arrayKey] || [];
        currentObj = currentObj[arrayKey];

        if (!currentObj[arrayIndex]) {
          currentObj[arrayIndex] = {};
        }

        if (i === keys.length - 1) {
          currentObj[arrayIndex] = value;
        } else {
          currentObj = currentObj[arrayIndex];
        }
      } else {
        if (!currentObj[key]) {
          if (i === keys.length - 1) {
            currentObj[key] = value;
          } else {
            currentObj[key] = {};
          }
        }
        currentObj = currentObj[key];
      }
    }
  }
  return currentObj
}

// export {
//   remap,
//   notate
// }

module.exports = {
  remap,
  notate
}