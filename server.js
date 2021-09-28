const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const router = require('./controller');
const dotenv = require('dotenv');
const passport = require('passport');
const flash = require('express-flash');
const initializePassport = require('./config/passport-config');
const sequelize = require('./config/connection');


const PORT = process.env.PORT || 3001;
const app = express();

const sess = {
    secret: 'secret',
    cookie: { expires: 5 * 60000 },
    resave: false,
    saveUninitialized: true,
}

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(router);

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});