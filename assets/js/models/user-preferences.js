export class UserPreferences {
  static THEMES=new Set(['light','dark']);
  constructor({theme='light',language='en'}={}){this.theme=UserPreferences.THEMES.has(theme)?theme:'light';this.language=typeof language==='string'&&language?language:'en'}
  withTheme(theme){return new UserPreferences({theme,language:this.language})}
  withLanguage(language){return new UserPreferences({theme:this.theme,language})}
}
