import { remap, notate } from '@trinly01/remap.js';

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
    ]
  }
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

async function test () {
    const transformedData = await remap(originalSourceData, keyMap);
    console.log(transformedData);

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
}

test()


