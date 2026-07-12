export class SafeStorage {
  constructor(storage=window.localStorage,logger=console){this.storage=storage;this.logger=logger}
  get(key,fallback=null){try{return this.storage.getItem(key)??fallback}catch(error){this.logger.error(`Cannot read storage key: ${key}`,error);return fallback}}
  set(key,value){try{this.storage.setItem(key,value);return true}catch(error){this.logger.error(`Cannot save storage key: ${key}`,error);return false}}
}
