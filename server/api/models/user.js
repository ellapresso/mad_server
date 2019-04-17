'use strict';

const DB = require('../../config/database');

const madDatabase = DB.madDb;

const User = {
    saveUser: (userinfo) => {
        return madDatabase
            .promise()
            .query('INSERT INTO `users` ( `uuid`, `id`, `nickname`, `profile_image`, `thumbnail_image` , `reg_date` ) VALUES ( ? , ? , ? , ? , ?, CURRENT_TIMESTAMP )', userinfo)
            .then(([rows]) => {
                return rows;
            });
    },
};

module.exports = User;
