import{LearnerProfile}from'../models/learner-profile.js';import{LearningProgress}from'../models/learning-progress.js';
export class LearnerStorageService {
  constructor(storage,sessionStorage){this.storage=storage;this.sessionStorage=sessionStorage;this.profileKey='hagpy.learner-profile';this.progressKey='hagpy.learning-progress';this.noticeKey='hagpy.local-notice-shown'}
  loadProfile(){return new LearnerProfile(this.#readJson(this.profileKey,{}))}
  saveProfile(profile){return this.storage.set(this.profileKey,JSON.stringify(profile))}
  loadProgress(){return new LearningProgress(this.#readJson(this.progressKey,{}))}
  saveProgress(progress){return this.storage.set(this.progressKey,JSON.stringify(progress.toJSON()))}
  shouldShowLocalNotice(){return this.sessionStorage.get(this.noticeKey)!=='true'}
  markLocalNoticeShown(){this.sessionStorage.set(this.noticeKey,'true')}
  resetProgress(){return this.storage.set(this.progressKey,JSON.stringify(new LearningProgress().toJSON()))}
  #readJson(key,fallback){try{return JSON.parse(this.storage.get(key,JSON.stringify(fallback)))}catch(error){console.error(`Invalid stored data for ${key}`,error);return fallback}}
}
