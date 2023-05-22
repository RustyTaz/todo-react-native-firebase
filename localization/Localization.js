import * as Localization from "expo-localization";
import en from "./en.json";
import ru from "./ru.json";

const getLanguage = () => {
	const locale = Localization.locale.split("-")[0];
	// Add additional language mappings here if needed
	switch (locale) {
		case "ru":
			return ru;
		default:
			return en;
	}
};

export default getLanguage();
