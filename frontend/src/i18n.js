import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import Backend from 'i18next-xhr-backend';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        },
        react: {
            useSuspense: true
        },
        backend: {
            loadPath: () => {
                const prefix = process.env.NODE_ENV === "production" ? process.env.REACT_APP_BASENAME : '';
                return  prefix + '/locales/{{lng}}/{{ns}}.json';
            },
        }

    });

export default i18n;
