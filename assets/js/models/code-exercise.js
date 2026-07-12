export class CodeExercise {
  constructor(data){if(!data?.id||typeof data.starterCode!=='string')throw new TypeError('Invalid exercise configuration');this.id=data.id;this.starterCode=data.starterCode;this.tests=Array.isArray(data.tests)?data.tests:[];this.packages=Array.isArray(data.packages)?data.packages:[]}
}
