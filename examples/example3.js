'use strict'

var { ModelManager, Repo } = require('../lib/index');

var data = {
  person: [
    {
      _id: '63', 
      name: 'Kevin', 
      bestFriendId: '89', 
      workPlaceId: '1',
      contact: {
        address: '123 Picton Road',
        tel: '123 456 789'
      },
      created: new Date()
    },
    {
      _id: '89', 
      name: 'Tom', 
      bestFriendId: '63', 
      workPlaceId: '2',
      contact: {
        address: '5 Marina Tower',
        tel: '133 436 109'
      }
    },
    {
      _id: '97', 
      name: 'Sarah', 
      bestFriendId: '63', 
      workPlaceId: '1',
      contact: {
        address: '93 Alderson Road',
        tel: '093 238 2349'
      }
    },
    {
      _id: '165', 
      name: 'Sam', 
      bestFriendId: '63', 
      workPlaceId: '2',
      contact: {
        address: '502 Tanjung Bungha',
        tel: '078 131 1847'
      }
    },
    {
      _id: '192', 
      name: 'Paula', 
      bestFriendId: '63', 
      workPlaceId: '1',
      contact: {
        address: '101 King Street',
        tel: '555 555 5555'
      }
    },
  ],
  workPlace: [
    {_id: '1', name: 'Hotel', managerId: '89'},
    {_id: '2', name: 'Bar', managerId: '192'},
  ]
};

var modelManager = new ModelManager({
  dataSources: [{
     name: 'db', type: 'mongodb', url: 'mongodb://localhost:27017/domain-model-example'
  }]
});

class Person {
  getName()
  {
    return this.name + ' (' + this._id + ')';
  }
};

class PersonContact {
  getAddress()
  {
    return this.address + ' (@)';
  }
};

var personRepo = new Repo({
  name: 'person',
  dataSource: 'db',
  strict: false,
  schema: {
    $construct: Person,
    _id: Number,
    bestFriendId: Number,
    workPlaceId: Number,
    created: Date,
    contact: {
      address: String,
      tel: String
    }
  },
  indexes: {
    bestFriendId: {spec: {bestFriendId: 1}},
    workPlaceId: {spec: {workPlaceId: 1}}
  },
  autoIndex: true,
  relations: {
    isConsideredBestFriendByCount: {
      type: 'hasManyCount',
      repo: 'person',
      key: 'bestFriendId',
      sort: ['name', 'asc'],
      autoPopulate: true
    },
    isConsideredBestFriendBy: {
      type: 'hasMany',
      repo: 'person',
      key: 'bestFriendId',
      sort: ['name', 'asc'],
      autoPopulate: true,
      recursion: 0
    },
    bestFriend: {
      type: 'belongsToOne',
      repo: 'person',
      key: 'bestFriendId',
      autoPopulate: true,
      recursion: 0
    },
    workPlace: {
      type: 'belongsToOne',
      repo: 'workPlace',
      key: 'workPlaceId',
      autoPopulate: true,
      recursion: 0
    }
  }
});
modelManager.addRepo(personRepo);

var workPlaceRepo = new Repo({
  name: 'workPlace',
  dataSource: 'db',
  schema: {
    _id: Number,
    managerId: Number
  },
  relations: {
    manager: {
      type: 'belongsToOne',
      repo: 'person',
      key: 'managerId',
      autoPopulate: true
    }
  }
});
modelManager.addRepo(workPlaceRepo);


(async () => {
  try {
    await modelManager.init();
    console.log('** Connected **');
    
    await personRepo.deleteMany();
    await workPlaceRepo.deleteMany();
    await personRepo.insertMany(data.person);
    await workPlaceRepo.insertOne(data.workPlace[0]);
    await personRepo.updateMany({'workPlaceId': 1}, {$set: {'contact.address': '123 Updated Street'}});
    var people = await personRepo.find({}, {sort: [['name', 'asc']]});

    console.log(JSON.stringify(people, null, 2));

    await modelManager.shutdown();
    console.log('** Disconnected **');
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));
  }
})();
