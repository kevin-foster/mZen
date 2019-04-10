import should = require('should');
import RepoPopulateRelation from '../../../../lib/repo-populate-relation';
import Repo from '../../../../lib/repo';
import MockDataSource from '../../../../lib/data-source/mock';

describe('embeddedHasOne()', function(){
  it('should populate', async () => {
    var data = {
      docs: [
        {
          userTimezone: [
            {_id: '1', userId: '9', name: 'Europe/London'}
          ],
          user: [
            {_id: '9', name: 'Kevin Foster'}
          ]
        }
      ]
    };

    var doc = new Repo({
      name: 'docs'
    });
    doc.dataSource = new MockDataSource(data);
    var repoPopulate = new RepoPopulateRelation(doc);

    // See RepoPopulateRelation.normalizeOptions() comments for descrption of relation options
    var docs = await repoPopulate.embeddedHasOne({
      docPath: 'user.*',
      docPathRelated: 'userTimezone.*',
      key: 'userId',
      alias: 'timezone'
    }, data.docs);
    
    should(docs[0].user[0].timezone.name).eql('Europe/London');
  });
  it('should populate array of docs', async () => {
    var data = {
      docs: [
        {
          userTimezone: [
            {_id: '1', userId: '9', name: 'Europe/London'}
          ],
          user: [
            {_id: '9', name: 'Kevin Foster'}
          ]
        },
        {
          userTimezone: [
            {_id: '2', userId: '29', name: 'Asia/Kuala_Lumpur'}
          ],
          user: [
            {_id: '29', name: 'Andy Jovan'}
          ]
        }
      ]
    };

    var doc = new Repo({
      name: 'docs'
    });
    doc.dataSource = new MockDataSource(data);
    var repoPopulate = new RepoPopulateRelation(doc);

    // See RepoPopulateRelation.normalizeOptions() comments for descrption of relation options
    var docs = await repoPopulate.embeddedHasOne({
      docPath: 'user.*',
      docPathRelated: 'userTimezone.*',
      key: 'userId',
      alias: 'timezone'
    }, data.docs);
    
    should(docs[0].user[0].timezone.name).eql('Europe/London');
    should(docs[1].user[0].timezone.name).eql('Asia/Kuala_Lumpur');
  });
});
