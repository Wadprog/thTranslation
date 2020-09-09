const helper = {};
const languagesInitials = ["EN:", "FR:", "DE:", "ES:", "PT:"];

helper.filterMacrosBylanguage = (lang, MacrosArray) => {
  //The MacrosArray contain all the Macro in all the language with the same title 
  const [correctMacro] = MacrosArray.filter(
    macro => macro.Name.indexOf(lang) > -1
  );
  //console.log({ correctMacro });
  if (typeof correctMacro === "object" && correctMacro != undefined)
    return correctMacro;
  else {
    if (lang.indexOf("EN:") == -1) {
      return false;
    }
    //sometime english version is save without the EN
    else {
      //we are searching for a macro with no lang(EN, FR ....)
      const [response] = MacrosArray.filter(
        //IF there are no languange there is no :
        macro => {
          if (!helper.containLanguageIntials(macro.Name)) return macro;
        }
      );
      if (typeof response === "object" && response != undefined) return response;
      else return false;
    }
  }
};
helper.containLanguageIntials = macroTitle => {
  for (var idx = 0; idx < languagesInitials.length; idx++) {
    if (macroTitle.indexOf(languagesInitials[idx]) > -1) return true;
  }
  return false;
};

helper.removeLanguageInitials = macroTitle => {
  if (helper.containLanguageIntials(macroTitle)) return macroTitle.substring(3);
  return macroTitle;
};
export default helper;
