const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const path = require("path")
const PORT = process.env.PORT || 5000;
const config = require('./config/db');
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGOODB_URL || config.MONGOODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(() => {
        console.log(' Connecté à la base de donnés ' + config.MONGOODB_URL);
    }).catch(err => {
        console.log(err);
    });

const app = express();

const corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ 'extended': false }));
mongoose.Promise = global.Promise;

const checkUserType = function (req, res, next) {
    const userType = req.originalUrl.split('/')[2];

    require('./config/passport')(userType, passport);
    next();
};


app.use(checkUserType);

const user = require("./controllers/user")
app.use('/user', user);
const wishlist = require("./controllers/wishlist")
app.use('/wishlist', wishlist);
const produit = require("./controllers/produit")
app.use('/produit', produit);
app.use(express.static(__dirname + '/'))
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });

}
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});