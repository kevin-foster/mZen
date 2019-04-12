import { Repo } from '../repo';
import { RepoPopulatorRelationConfig } from './relation-abstract';
import { RepoPopulatorRelationHasAbstract } from './relation-has-abstract';

export class RepoPopulatorRelationHasMany extends RepoPopulatorRelationHasAbstract
{
  async populate(relationRepo: Repo, config: RepoPopulatorRelationConfig, docs)
  {
    config = this.normalizeConfig(config);
    config.relation = 'hasMany';
    return this.has(relationRepo, config, docs);
  }
}

export default RepoPopulatorRelationHasMany;
