export class LearningProgress {
  constructor({lastLessonSlug=null,highestLessonIndex=-1,completedLessons=[],passedExercises={},lastVisitedAt=null}={}){this.lastLessonSlug=lastLessonSlug;this.highestLessonIndex=Number.isInteger(highestLessonIndex)?highestLessonIndex:-1;this.completedLessons=new Set(Array.isArray(completedLessons)?completedLessons:[]);this.passedExercises=passedExercises&&typeof passedExercises==='object'?{...passedExercises}:{};this.lastVisitedAt=lastVisitedAt}
  visit(slug,index){this.lastLessonSlug=slug;this.highestLessonIndex=Math.max(this.highestLessonIndex,index);this.lastVisitedAt=new Date().toISOString()}
  completeLesson(slug){this.completedLessons.add(slug)}
  passExercise(exerciseId,attempts){this.passedExercises[exerciseId]={passedAt:new Date().toISOString(),attempts}}
  prune(validSlugs){const valid=new Set(validSlugs);this.completedLessons=new Set([...this.completedLessons].filter(slug=>valid.has(slug)));if(this.lastLessonSlug&&!valid.has(this.lastLessonSlug))this.lastLessonSlug=null}
  isCompleted(slug){return this.completedLessons.has(slug)}
  percentage(total){return total>0?Math.round(this.completedLessons.size/total*100):0}
  toJSON(){return{lastLessonSlug:this.lastLessonSlug,highestLessonIndex:this.highestLessonIndex,completedLessons:[...this.completedLessons],passedExercises:this.passedExercises,lastVisitedAt:this.lastVisitedAt}}
}
