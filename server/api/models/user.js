'use strict';

const DB = require('../../config/database');

const madDatabase = DB.madDb;

const User = {
    chkUser: (id) => {
        return madDatabase
            .promise()
            .query('SELECT nickname FROM `users` where `id`=?', id)
            .then(([rows]) => {
                return rows;
            });
    },
    // 신규 회원
    saveUser: (userinfo) => {
        return madDatabase
            .promise()
            .query(
                'INSERT INTO `users` ( `id`, `nickname`, `profile_image`, `thumbnail_image` , `reg_date` ) VALUES (  ? , ? , ? , ?, CURRENT_TIMESTAMP )',
                userinfo
            )
            .then(([rows]) => {
                return rows;
            });
    },
    // 기존 사용자 구분
};

module.exports = User;
