'use strict';

const passport = require('passport');
const kakao = require('passport-kakao');
const kakaoPassport = new kakao.Strategy();

passport.use(
    kakaoPassport(
        {
            clientID: '6524057de9740a3a5e7e82bbaaf94679',
            callbackURL: '/oauth',
        },
        function (acccessToken, refreshToken, profile, done) {
            console.log(profile);
            return done;
        }
    )
);
