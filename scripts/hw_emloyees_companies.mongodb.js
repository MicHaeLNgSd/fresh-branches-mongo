db.createCollection('companies', {
  validator: {
    $jsonSchema: {
      title: 'companies obj validation',
      bsonType: 'object',
      description: 'companies must be obj with name',
      required: ['name'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'name must be a string',
          minLength: 2,
        },
      },
    },
  },
});

db.createCollection('employees', {
  validator: {
    $jsonSchema: {
      title: 'employees obj validation',
      bsonType: 'object',
      description: 'employees must be obj with name, companyId',
      required: ['name', 'companyId'],
      properties: {
        name: {
          bsonType: 'string',
          description: 'name must be a string',
          minLength: 2,
        },
        companyId: {
          bsonType: 'objectId',
          description: 'companyId must be a objectId',
        },
      },
    },
  },
});

db.companies.insertMany([
  {
    name: 'Company1',
  },
  {
    name: 'Company2',
  },
  {
    name: 'Company3',
  },
]);

db.employees.insertMany([
  {
    name: 'Employee1',
    companyId: new ObjectId('6609c7e69d398c7f34ffd24e'),
  },
  {
    name: 'Employee2',
    companyId: new ObjectId('6609c7e69d398c7f34ffd24f'),
  },
  {
    name: 'Employee3',
    companyId: new ObjectId('6609c7e69d398c7f34ffd24e'),
  },
  {
    name: 'Employee4',
    companyId: new ObjectId('6609c7e69d398c7f34ffd24f'),
  },
  {
    name: 'Employee5',
    companyId: new ObjectId('6609c7e69d398c7f34ffd24f'),
  },
  {
    name: 'Employee6',
    companyId: new ObjectId('6609c7e69d398c7f34ffd250'),
  },
]);

db.companies.find({});

db.companies.aggregate([
  {
    $lookup: {
      from: 'employees',
      localField: '_id',
      foreignField: 'companyId',
      as: 'employee',
    },
  },
  { $unset: ['employee.companyId'] },
  {
    $addFields: {
      amountOfEmployees: { $size: '$employee' },
    },
  },
]);

// db.companies.aggregate([
//   {
//     $lookup: {
//       from: 'employees',
//       localField: '_id',
//       foreignField: 'companyId',
//       as: 'employee',
//     },
//   },
//   {
//     $group: {
//       _id: '$name',
//       amountOfEmployees: {
//         $count: {},
//       },
//     },
//   },
// ]);

db.companies.aggregate([
  {
    $lookup: {
      from: 'employees',
      localField: '_id',
      foreignField: 'companyId',
      as: 'employee',
    },
  },
  { $unwind: '$employee' },
  {
    $group: {
      _id: '$name',
      amountOfEmployees: {
        $count: {},
      },
    },
  },
]);

db.companies.aggregate([
  {
    $match: { _id: new ObjectId('6609c7e69d398c7f34ffd24e') },
  },
  {
    $lookup: {
      from: 'employees',
      localField: '_id',
      foreignField: 'companyId',
      as: 'employee',
    },
  },
  { $unwind: '$employee' },
  {
    $group: {
      _id: '$name',
      amountOfEmployees: {
        $count: {},
      },
    },
  },
]);
//!=============================

// minimum
// maximum
// maxItems//for arr
// minItems//for arr
// uniqueItems//for arr
// pattern: 'regExp'
// arr: { bsonType: 'array', items: 'typeOfArrayItems' },

db.t1.aggregate([
  {
    $lookup: {
      from: 't1',
      localField: 't1_name',
      foreighnField: 't2_name',
      as: 'newT1FieldNameForArr',
    },
  },
  { $unwind: '$arrFieldToDecart' }, // decart dobutok [arrField, ...restFields]//one obj with arr of many item-objs to just many obj with 1 item-obj
  { $unset: ['FieldToDelete'] }, //remove fields wrom doc
  { $match: {} }, //WHERE when use aggregate
  {
    $group: {
      _id: '$fieldToStayAndGROUP1', //TODO how to get many
      newFieldName: {
        $count: {}, //mongo ver >= 5
      },
      newFieldNameOldVer: {
        $sum: 1, //mongo any ver
      },
      $sort: {},
      $skip: {}, //OFFSET
      $limit: {}, //LIMIT
    },
    //===========
    $group: {
      _id: null, //agregate in SELECT
      newFieldName: {
        $count: {}, //mongo ver >= 5
      },
    },
  },
]);
