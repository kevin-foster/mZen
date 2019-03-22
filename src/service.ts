import { ModelManagerConfig } from './model-manager';
import Repo from './repo';

export interface ServiceConfig
{
  model?: ModelManagerConfig;
  name?: string;
  repos?: {[key: string]: Repo} | Array<Repo>;
  services?: {[key: string]: Service} | Array<Service>;
}

export class Service
{
  config: ServiceConfig;
  name: string;
  repos: {[key: string]: Repo};
  services: {[key: string]: Service};
  
  constructor(options?: ServiceConfig) 
  {
    this.config = options ? options : {};
    this.config.model = this.config.model ? this.config.model : {}; // The main config is injected here
    this.config.name = this.config.name ? this.config.name : '';
    this.config.repos = this.config.repos ? this.config.repos : {};
    this.config.services = this.config.services ? this.config.services : {};

    this.name = this.config.name ? this.config.name : this.constructor.name;
    this.repos = {};
    this.services = {};

    if (this.config.repos) this.addRepos(this.config.repos);
    if (this.config.services) this.addServices(this.config.services);
  }
  
  init()
  {
    // This method might need to do async work at some point we return a promise
    return Promise.resolve();
  }
  
  getName(): string
  {
    // If service name == 'Service' then we are most likely using the name of the default service constrcutor.
    // This can cause problems because services are referred to by name in the model and if we have multiple
    // services named 'Service' we could not be sure which one we are working with
    // For this reason we do not permit a service to be named 'Service'
    if (this.name == 'Service') throw new Error('Service name not configured - you must specify a service name when using the default service constructor');
    return this.name;
  }
  
  addRepo(repo: Repo)
  {
    this.repos[repo.getName()] = repo;
  }
  
  getRepo(name): Repo
  {
    return this.repos[name];
  }
  
  addRepos(repos: Array<Repo> | {[key:string]: Repo})
  {
    if (repos) {
      // could be an array of repo objects or a object map
      var reopsArray = Array.isArray(repos) ? repos : Object.keys(repos).map(name => repos[name]);
      reopsArray.forEach(repo => {
        if (repo instanceof Repo) this.addRepo(repo);
      });
    }
  }
  
  addService(service: Service)
  {
    this.services[service.getName()] = service;
  }
  
  getService(name): Service
  {
    return (name == this.name) ? this : this.services[name];
  }
  
  addServices(services: Array<Service> | {[key: string]: Service})
  {
    if (services) {
      // could be an array of repo objects or a object map
      var servicesArray = Array.isArray(services) ? services : Object.keys(services).map(name => services[name]);
      servicesArray.forEach(service => {
        if (service instanceof Service) this.addService(service);
      });
    }
  }
}

export default Service;
