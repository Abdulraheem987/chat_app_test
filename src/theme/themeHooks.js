import {useColorMode} from 'native-base';
import {useTranslation} from 'react-i18next';

function themeHooks() {
  const {t, i18n} = useTranslation();
  const {colorMode, toggleColorMode} = useColorMode();
  const bgColor = colorMode === 'dark' ? '#003F5E' : '#fff';

  return {
    t,
    colorMode,
    bgColor,
  };
}

export default themeHooks;
