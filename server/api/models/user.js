'use strict';

const DB = require('../../config/database');

const madDatabase = DB.madDb;

const User = {
    saveUser: () => {
        return madDatabase
            .promise()
            .query('INSERT INTO `users` ( `uNo`, `id`, `nickname`, `profile_image`, `thumbmail_image`, `user_email` , `reg_date`, `update_day`) VALUES ( ? , ? , ? , ? , ? , ?, CURRENT_TIMESTAMP ,  )', contents)
            .then(([rows]) => {
                return rows;
            });
    },
}

module.exports = User;
