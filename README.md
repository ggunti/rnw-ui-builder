# rnw-ui-builder
UI builder for android &amp; iOS &amp; web based on react-native-web.

**This project works as a UI builder which is able to generate react-native-web compatible code that runs on android & iOS & web.**

### How it is structured?
- There is a server which is basically used to load and save all user related projects and pages. It uses a MySQL database under the hood. The server is used by the web app (the builder) and mobile apps (android & iOS).
- There is a web app (the builder), which you can use to build the UI's of your pages inside any project. It's just drag and drop. You can also preview what you built directly in the web app.
- There are two mobile apps (android & iOS), which you can use only to preview the pages of your projects which you built using the web app. This way you can see how your pages will look on mobile devices.

Features:
- [x] Multiple projects for each registered user
- [x] Multiple pages (screens) per project
- [x] Drag and drop UI elements
- [x] Ability to customize UI elements and instantly see every change
- [x] Ability to preview built pages on android & iOS & web
- [x] Generate react-native-web compatible code based on built UI screens
- [ ] Support for global theming and app variables when building own UI screens
- [ ] Support for defining and using props for UI screens
- [ ] Preview auto-refresh when a change is made in the UI screen
- [ ] Multiple users per project
- [ ] Ability to copy components (including its children) while building a UI

### How to run it?
* You can setup this UI builder to run locally on your machine. Check [local setup](./LOCAL_SETUP.md).

* A much simpler approach to use this UI builder is to create an account at [RNW UI Builder](https://order-software.com/uiBuilder). Currently it is 100% free to use and will always have a generous free plan. Affordable paid plans may come in the future in order to be able to continue the development of this project and support it's growth.

### How can you help / contribute?
* Check the exposed props of draggable components in `Page Editor` screen and create an issue if you think that some props should be added / removed. Currently the draggable components may contain also props that are not helpful for a specific component and they should be removed in future.

* Suggest other libraries which could be easier to use for generating source code (currently `handlebars` is used).

* Any other bug report or suggestion is welcome. Note that the project is at the beginning, so obviously some features are missing.
