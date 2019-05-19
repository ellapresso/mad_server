'use strict';

const DB = require('../../config/database');

const madDatabase = DB.madDb;
const Like = {
    setLike: (pno, id) => {
        let sql = 'INSERT INTO `likes`(`pno`,`luser`) SELECT ?, ? FROM DUAL ';
        sql += 'WHERE NOT EXISTS (SELECT `pno`, `luser` FROM `likes` WHERE `pno` = ? AND `luser` = ?)';
        return madDatabase
            .promise()
            // eslint-disable-next-line max-len
            .query(sql, [pno, id, pno, id])
            .then(([rows]) => {
                return rows;
            });
    },
    delLike: (pno, id) => {
        const sql = 'DELETE FROM `likes` WHERE `pno` = ? AND `luser` = ?';
        return madDatabase
            .promise()
            .query(sql, [pno, id])
            .then(([rows]) => {
                return rows;
            });
    },
    rankLike: () => {
        const sql = 'SELECT `pno`,count(`luser`) AS `like` FROM `likes` GROUP BY `pno` ORDER BY `like` DESC';
        return madDatabase
            .promise()
            .query(sql)
            .then(([rows]) => {
                return rows;
            });
    },
    chartLike: () => {
        const sql = 'SELECT `pno`,count(`luser`) `likeCnt` FROM `likes` GROUP BY `pno` ORDER BY count(`luser`) DESC';
        return madDatabase
            .promise()
            .query(sql)
            .then(([rows]) => {
                return rows;
            });
    },
};

module.exports = Like;
