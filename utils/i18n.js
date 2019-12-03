// /utils/i18n.js
import locales from 'locales.js'
let T = {
  language: "en",
  locales: locales["en"]
}

T.registerLanguage = function (language) {
  switch (language) {
    case 'en': //英文
      T.language = "en";
      T.locales = locales["en"];
      break;
    case 'zh_CN': //简体中文
      T.language = "zh_CN";
      T.locales = locales["zh_CN"];
      break;
  }
}

export default T