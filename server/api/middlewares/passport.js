'use strict';

// const passport = require('passport');
const Kakao = require('passport-kakao').Strategy;
const kakaoPassport = new Kakao();

module.exports = (app) => {
    app.use(
        kakaoPassport(
            {
                clientID: '6524057de9740a3a5e7e82bbaaf94679',
                callbackURL: 'localhost:4000/oauth',
            },
            function (acccessToken, refreshToken, profile, done) {
                console.log(profile);
                return done(profile);
            }
        )
    );
};
