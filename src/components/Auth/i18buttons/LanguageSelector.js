import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { changeLocale } from "../../../redux/actions/LocaleActions";

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    dispatch(changeLocale(lng));
  };

  return (
    <div className="flex justify-center items-center mb-4">
      <button className="px-2 py-1 rounded bg-white text-gray-800" onClick={() => changeLanguage('en')}>
        EN
      </button>
      <button className="px-2 py-1 rounded bg-white text-gray-800 ml-2" onClick={() => changeLanguage('pt')}>
        PT
      </button>
      {/* Add more buttons for other languages as needed */}
    </div>
  );
};

export { LanguageSelector };