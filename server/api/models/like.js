'use strict';

const DB = require('../../config/database');

const madDatabase = DB.madDb;
const Like = {
    setLike: (pno, id) => {
        let sql = 'INSERT INTO `likes`(`pno`,`luser`) SELECT ?, ? FROM DUAL ';
        sql += 'WHERE NOT EXISTS (SELECT `pno`, `luser` FROM `likes` WHERE `pno` = ? and `luser` = ?)';
        return madDatabase
            .promise()
            // eslint-disable-next-line max-len
            .query(sql, [pno, id, pno, id])
            .then(([rows]) => {
                return rows;
            });
    },
    delLike: (pno, id) => {
        const sql = 'DELETE FROM `likes` WHERE `pno` = ? and `luser` = ?';
        return madDatabase
            .promise()
            .query(sql, [pno, id])
            .then(([rows]) => {
                return rows;
            });
    },
    rankLike: () => {
        const sql = 'select `pno`,count(`luser`) as `like` from `likes` group by `pno` order by `like` desc';
        return madDatabase
            .promise()
            .query(sql)
            .then(([rows]) => {
                return rows;
            });
    },
    chartLike: () => {
        const sql = 'select `pno`,count(`luser`) `likeCnt` from `likes` group by `pno` order by count(`luser`) desc';
        return madDatabase
            .promise()
            .query(sql)
            .then(([rows]) => {
                return rows;
            });
    },
};

module.exports = Like;
