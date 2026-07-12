export class LearnerProfile {
  constructor({displayName='',createdAt=null}={}){this.displayName=typeof displayName==='string'?displayName.trim().slice(0,40):'';this.createdAt=createdAt??new Date().toISOString()}
  get isConfigured(){return this.displayName.length>0}
  withName(displayName){return new LearnerProfile({displayName,createdAt:this.createdAt})}
}
