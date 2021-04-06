import { AppRegistry } from 'react-native';
import app from './app.json';
import App from './src/App';

/* START react-native-vector-icons SETUP */

// Generate required css
// @ts-ignore
import antDesignFont from 'react-native-vector-icons/Fonts/AntDesign.ttf';
// @ts-ignore
import entypoFont from 'react-native-vector-icons/Fonts/Entypo.ttf';
// @ts-ignore
import evilIconFont from 'react-native-vector-icons/Fonts/EvilIcons.ttf';
// @ts-ignore
import featherFont from 'react-native-vector-icons/Fonts/Feather.ttf';
// @ts-ignore
import fontAwesomeFont from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
// @ts-ignore
import fontAwesome5RegularFont from 'react-native-vector-icons/Fonts/FontAwesome5_Regular.ttf';
// @ts-ignore
import fontAwesome5SolidFont from 'react-native-vector-icons/Fonts/FontAwesome5_Solid.ttf';
// @ts-ignore
import fontAwesome5BrandsFont from 'react-native-vector-icons/Fonts/FontAwesome5_Brands.ttf';
// @ts-ignore
import fontistoFont from 'react-native-vector-icons/Fonts/Fontisto.ttf';
// @ts-ignore
import foundationFont from 'react-native-vector-icons/Fonts/Foundation.ttf';
// @ts-ignore
import ioniconFont from 'react-native-vector-icons/Fonts/Ionicons.ttf';
// @ts-ignore
import materialFont from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';
// @ts-ignore
import materialCommunityFont from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';
// @ts-ignore
import octiconFont from 'react-native-vector-icons/Fonts/Octicons.ttf';
// @ts-ignore
import simpleLineIconFont from 'react-native-vector-icons/Fonts/SimpleLineIcons.ttf';
// @ts-ignore
import zocialFont from 'react-native-vector-icons/Fonts/Zocial.ttf';

const antDesignFontStyles = `@font-face {
  src: url(${antDesignFont});
  font-family: AntDesign;
}`;

const entypoFontStyles = `@font-face {
  src: url(${entypoFont});
  font-family: Entypo;
}`;

const evilIconFontStyles = `@font-face {
  src: url(${evilIconFont});
  font-family: EvilIcons;
}`;

const featherFontStyles = `@font-face {
  src: url(${featherFont});
  font-family: Feather;
}`;

const fontAwesomeFontStyles = `@font-face {
  src: url(${fontAwesomeFont});
  font-family: FontAwesome;
}`;

const fontAwesome5RegularFontStyles = `@font-face {
  src: url(${fontAwesome5RegularFont});
  font-family: FontAwesome5_Regular;
}`;

const fontAwesome5SolidFontStyles = `@font-face {
  src: url(${fontAwesome5SolidFont});
  font-family: FontAwesome5_Solid;
}`;

const fontAwesome5BrandsFontStyles = `@font-face {
  src: url(${fontAwesome5BrandsFont});
  font-family: FontAwesome5_Brands;
}`;

const fontistoFontStyles = `@font-face {
  src: url(${fontistoFont});
  font-family: Fontisto;
}`;

const foundationFontStyles = `@font-face {
  src: url(${foundationFont});
  font-family: Foundation;
}`;

const ioniconFontStyles = `@font-face {
  src: url(${ioniconFont});
  font-family: Ionicons;
}`;

const materialFontStyles = `@font-face {
  src: url(${materialFont});
  font-family: MaterialIcons;
}`;

const materialCommunityFontStyles = `@font-face {
  src: url(${materialCommunityFont});
  font-family: MaterialCommunityIcons;
}`;

const octiconFontStyles = `@font-face {
  src: url(${octiconFont});
  font-family: Octicons;
}`;

const simpleLineIconFontStyles = `@font-face {
  src: url(${simpleLineIconFont});
  font-family: SimpleLineIcons;
}`;

const zocialFontStyles = `@font-face {
  src: url(${zocialFont});
  font-family: Zocial;
}`;

// Create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
style.appendChild(document.createTextNode(antDesignFontStyles));
style.appendChild(document.createTextNode(entypoFontStyles));
style.appendChild(document.createTextNode(evilIconFontStyles));
style.appendChild(document.createTextNode(featherFontStyles));
style.appendChild(document.createTextNode(fontAwesomeFontStyles));
style.appendChild(document.createTextNode(fontAwesome5RegularFontStyles));
style.appendChild(document.createTextNode(fontAwesome5SolidFontStyles));
style.appendChild(document.createTextNode(fontAwesome5BrandsFontStyles));
style.appendChild(document.createTextNode(fontistoFontStyles));
style.appendChild(document.createTextNode(foundationFontStyles));
style.appendChild(document.createTextNode(ioniconFontStyles));
style.appendChild(document.createTextNode(materialFontStyles));
style.appendChild(document.createTextNode(materialCommunityFontStyles));
style.appendChild(document.createTextNode(octiconFontStyles));
style.appendChild(document.createTextNode(simpleLineIconFontStyles));
style.appendChild(document.createTextNode(zocialFontStyles));

// Inject stylesheet
document.head.appendChild(style);

/* END react-native-vector-icons SETUP */

const appName = app.name;

AppRegistry.registerComponent(appName, () => App);

AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});
