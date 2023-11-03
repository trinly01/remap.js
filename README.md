# Remap.JS Library Documentation

The Remap.JS library is a versatile JavaScript utility that simplifies data transformation, making it suitable for a wide range of use cases like complex data, including nested data, arrays, and objects. You can adapt these concepts to suit various use cases, making the library a valuable tool for data manipulation..

## Benefits

- **Data Simplification:** Remap complex, nested data structures into a more straightforward and user-friendly format, making it easier to work with and understand.

- **Custom Mapping:** Define your own key mapping configuration, giving you full control over which data fields to extract and where to place them in the destination object. The keyMap configuration can be dynamically generated based on user input or system-generated requirements.

- **Iterator Support:** Process each mapped item asynchronously with an optional iterator function, making it versatile for various use cases.

## Installation

To get started with the Remap library, import it into your JavaScript file:

```terminal
 npm i @trinly01/remap.js
```

```javascript
import { remap, notate } from '@trinly01/remap.js';
```
## Complex Usage Examples

### Complex `remap` Example

Consider a complex data structure with nested objects and arrays:

```javascript
import { remap } from '@trinly01/remap.js';

const originalSourceData = [
  {
    id: 1,
    name: 'John Doe',
    contact: {
      emails: ['john@work.com', 'john@personal.com'],
      phones: [
        { type: 'work', number: '123-456-7890' },
        { type: 'personal', number: '098-765-4321' },
      ],
    },
    addresses: [
      { type: 'home', location: '123 Main St, Apt 101' },
      { type: 'work', location: '456 Business St, Suite 200' },
    ],
  },
  // Additional source data objects here
];

const keyMap = {
  'Profile.id': 'id',
  'Profile.name': 'name',
  'Profile.emails[0]': 'contact.emails.0',
  'Profile.emails[1]': 'contact.emails.1',
  'Profile.workPhone': 'contact.phones[0].number',
  'Profile.homeAddress': 'addresses[0].location',
  'Profile.workAddress': 'addresses[1].location',
};

const transformedData = remap(originalSourceData, keyMap);

console.log(transformedData);
```

In this complex `remap` example, we're extracting various data fields from a nested data structure. The resulting transformed data will have a flattened structure.

### Complex `notate` Example

Now, let's use the `notate` function to create complex objects with specific key notations:

```javascript
import { notate } from '@trinly01/remap.js';

const result = {};

notate('Profile.id', 1, result);
notate('Profile.name', 'John Doe', result);

// Nested objects and arrays
notate('Profile.emails[0]', 'john@work.com', result);
notate('Profile.emails[1]', 'john@personal.com', result);
notate('Profile.contact.phones[0].type', 'work', result);
notate('Profile.contact.phones[0].number', '123-456-7890', result);
notate('Profile.contact.phones[1].type', 'personal', result);
notate('Profile.contact.phones[1].number', '098-765-4321', result);
notate('Profile.addresses[0].type', 'home', result);
notate('Profile.addresses[0].location', '123 Main St, Apt 101', result);
notate('Profile.addresses[1].type', 'work', result);
notate('Profile.addresses[1].location', '456 Business St, Suite 200', result);

console.log(result);
```

This `notate` example demonstrates creating a complex object structure with nested objects and arrays, allowing precise control over the resulting data structure.

## Functions

### `remap` Function Parameters

The `remap` function transforms an array of objects into a new array with the mapped data according to the specified key mapping.

| Parameter    | Type | Description                                                                         |
|--------------|------|-------------------------------------------------------------------------------------|
| `arr`        | Array | The array of source objects to remap.                                             |
| `keyMap`     | Object | The key mapping configuration defining how to map the source data to the destination object. This configuration can be dynamically generated based on user input or system-generated requirements. |
| `iterator`   | Function (Optional) | An asynchronous function for processing each mapped item.                           |

### `notate` Function Parameters

The `notate` function is used to create and assign values to objects with a specific key notation. It's highly flexible and adaptable for various use cases.

| Parameter    | Type | Description                                                                         |
|--------------|------|-------------------------------------------------------------------------------------|
| `notation`   | Object or String | The key notation in the destination object. If it's an object, you can set multiple values at once. If it's a single path notation (string), the value parameter is required.                                         |
| `value`      | Any | The value to assign to the destination object. Required when notation is a single path notation (string).                                      |
| `result`     | (Optional) The result object where the data will be assigned. If provided, the assigned data will be stored in this object.                                  |

These two separate markdown tables provide a clear and structured overview of the parameter information for the `remap` and `notate` functions without the "Default" column.

