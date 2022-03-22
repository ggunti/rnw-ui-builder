# Local setup

The first step is to clone the repo.

### Server setup

1. Make sure that your computer is configured to be able to run [laravel](https://laravel.com/docs/8.x) projects which uses MySQL database.
2. Create a `server/.env` file and copy the content of `server/.env.example` into it.
3. Configure `APP_KEY`, `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` and `JWT_SECRET` properly in
the `server/.env` file. Also, when new user signs up, the server will try to send a confirmation email to the user, so if you want it to work properly, the `MAIL_...`
fields should be configured as well (you could create a free account at [mailgun](https://mailgun.com)). If you will just add a user directly into the database
and not use the signup feature, you not need to setup mailing. The other fields in `server/.env` can remain unchanged.
4. Run `composer install` to install the dependencies of the server.
4. Run `php artisan migrate` to create the tables in the database.
5. Run `php artisan serve` to run the server.

### Client setup

1. Make sure that you are able to create and run [react-native](https://reactnative.dev/) projects on your computer.
2. Run `npm install` inside the `client` directory.
3. Make sure that the server is running.
4. Run `npm run web` to start the UI builder for the web. Then navigate to `http://localhost:8080` in your browser. If you want to run the app for android or iOS,
run `npm run android` or `npm run ios`. Note that the android & iOS versions contain only the preview functionality. They will not allow you to build pages, they allow
only to preview pages that you already built using the web version of the app.
