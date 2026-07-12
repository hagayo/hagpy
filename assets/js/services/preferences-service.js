import{UserPreferences}from'../models/user-preferences.js';
export class PreferencesService {
  constructor(storage,eventBus){this.storage=storage;this.eventBus=eventBus;this.key='hagpy.preferences'}
  load(){try{return new UserPreferences(JSON.parse(this.storage.get(this.key,'{}')))}catch(error){console.error('Invalid saved preferences',error);return new UserPreferences()}}
  save(preferences){this.storage.set(this.key,JSON.stringify(preferences));this.eventBus.emit('preferences:changed',preferences)}
}
