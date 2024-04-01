//BSON - binary + JSON - serialized format to store document + make remote procedure calls in MongoDB

db.createCollection('t_name', {
  validator: {
    $jsonSchema: {
      //validationLevel: 'off, strict, moderate',
      //validationAction: 'error, warn',
      //description: 't_name must be obj with name, canBeNotFromPropsButAnything
      bsonType: 'object',
      title: 'some optional text',
      required: ['name', 'canBeNotFromPropsButAnything'], //
      properties: {
        name: {
          //properties to validate
          bsonType: 'string',
          //description: 'must be str'
        },
        name: {
          //properties to validate
          bsonType: 'int bool ',
        },
        arr: { bsonType: 'array', items: 'typeOfArrayItems' },
        minimum 
        maximum 
        maxItems//for arr
        minItems//for arr
        uniqueItems//for arr
        pattern: 'regExp'
      },
    },
  },
});

//add or update valSchema
db.runCommand({
  collMod: 't_name', //modify collection
  validator: {}, //new validator
});
