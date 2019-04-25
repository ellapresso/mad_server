'use strict';

const DB = require('../../config/database');

const madDatabase = DB.madDb;
const Like = {
    setLike: (pno, id) => {
        return madDatabase
            .promise()
            .query('INSERT INTO likes(pno,luser) VALUES( ?, ? )', [pno, id])
            .then(([rows]) => {
                return rows;
            });
    },
    delLike: (pno, id) => {
        return madDatabase
            .promise()
            .query('DELETE FROM likes WEHRE pno = ? and luser = ?', [pno, id])
            .then(([rows]) => {
                return rows;
            });
    },
};

module.exports = Like;
