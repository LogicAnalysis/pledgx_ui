import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// French
import main_fr from "./components/localization/locales/fr/main.json";

// English
import main_en from "./components/localization/locales/en/main.json";

const resources = {
	fr: {
		main: main_fr
	},
	en: {
		main: main_en,
	}
};

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: localStorage.getItem('i18_lang') || 'en',

		interpolation: {
			escapeValue: false
		},
		fallbackLng: ["en", "dev"]
	});

export default i18n;
