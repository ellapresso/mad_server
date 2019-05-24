/* eslint-disable max-len */
// 'use strict';

const DB = require('../../config/database');

const madDatabase = DB.madDb;
const Post = {
    getPost: (userId, page, word) => {
        let sql =
            'select `posts`.`pno`,`users`.`nickname` as `writer`,`title`,`contents`,`hashes`, if(`likes`,`likes`,0) as likes ,`wrDate`,`upDate`,`users`.`thumbnail_image` as `thumbnail_image`';
        if (userId) {
            sql += ', if(`users`.`id`=' + userId + ', true, false) as `nowUser`, if(`fav`.`luser`,true,false) as love';
        }
        sql += ' from `posts`';
        sql += ' left join (select `pno`, GROUP_CONCAT(`hContent` SEPARATOR ",") as `hashes` from `hashes` where `isDel` = 0 group by `pno`) `hash` on `posts`.`pno` = `hash`.`pno`';
        sql += ' left join (select pno, count(lno) as likes from likes group by pno) likes on `posts`.`pno` = `likes`.`pno`';
        if (userId) {
            sql += ' left join (select `pno`,`luser` from `likes` where `luser` = ' + userId + ') `fav` on `fav`.`pno` = `posts`.`pno`';
        }
        sql += ' left join `users` on `users`.`id` = `posts`.`writer`';
        sql += ' where `posts`.`isDel`= 0';

        // 최종 쿼리 + 검색쿼리
        sql = 'select * from (' + sql + ') a';
        if (word) {
            sql += ' where `writer` like "%' + word + '%" or `hashes` like "%' + word + '%" or `title` like "%' + word + '%"';
        }
        sql += ' group by `pno` order by `pno` desc';

        // 페이징
        if (page) {
            sql += ` limit ${page}`;
        } else {
            sql += ' limit 4';
        }
        return madDatabase
            .promise()
            .query(sql)
            .then(([rows]) => {
                return rows;
            });
    },
    getTotal: (word) => {
        let sql = 'select * from';
        sql += ' (select `posts`.`pno`, `users`.`nickname` as `writer`, `title`, `contents`, `hashes`, if (`likes`, `likes`, 0) as likes, `wrDate`, `upDate`, `users`.`thumbnail_image` as `thumbnail_image`';
        sql += ' from `posts`';
        sql += ' left join';
        sql += ' (select `pno`, GROUP_CONCAT(`hContent` SEPARATOR ",") as `hashes` from `hashes` where `isDel` = 0 group by `pno` ) `hash` on `posts`.`pno` = `hash`.`pno`';
        sql += ' left join ( select pno, count(lno) as likes from likes group by pno ) likes on `posts`.`pno` = `likes`.`pno`';
        sql += ' left join `users` on `users`.`id` = `posts`.`writer` where `posts`.`isDel` = 0) a';
        if (word) {
            sql += ' where `writer` like "%' + word + '%" or `hashes` like "%' + word + '%" or `title` like "%' + word + '%"';
        }
        sql += ' group by `pno` order by `pno` desc ';
        sql = 'select count(*) as `totalCnt` from(' + sql + ') b';
        return madDatabase
            .promise()
            .query(sql)
            .then(([rows]) => {
                return rows[0];
            });
    },
    setPost: (contents) => {
        const sql = 'INSERT INTO `posts` ( `title`, `contents`, `writer`, `wrDate`) VALUES (?,?, ?, ?)';
        return madDatabase
            .promise()
            .query(sql, contents)
            .then(([rows]) => {
                return rows;
            });
    },
    updatePost: (contents) => {
        const sql = 'UPDATE `posts` SET `title`=?, `contents`=?, `writer`=?, `upDate`=? where `pno` =? and `isDel` = 0';
        return madDatabase
            .promise()
            .query(sql, contents)
            .then(([rows]) => {
                return rows;
            });
    },
    deletePost: (delInfo) => {
        const sql = 'UPDATE `posts` SET `isDel` = 1, `upDate`=? where `pno`=? and `writer`=?';
        return madDatabase
            .promise()
            .query(sql, delInfo)
            .then((rows) => {
                return rows;
            });
    },
    deleteHash: (upDate, pno) => {
        const sql = 'UPDATE `hashes` SET `isDel` = 1, `upDate`=? where `pno`=? ';
        return madDatabase
            .promise()
            .query(sql, [upDate, pno])
            .then((rows) => {
                return rows;
            });
    },
    getContents: (info) => {
        let sql = 'select `posts`.`pno`, `title`, `nickname`, `contents`, `thumbnail_image`, `reg_date`, `update_day`, hashes';
        sql += ' from `posts` left join `users` on `posts`.`writer` = `users`.`id`';
        sql += ' left join (select `pno`, GROUP_CONCAT(`hContent` SEPARATOR ",") as `hashes` from `hashes` where `isDel` = 0 group by `pno`) `hash` on `posts`.`pno` = `hash`.`pno`';
        sql += ' where `posts`.`pno` = ? and `writer` = ? and `isDel` = 0';
        return madDatabase
            .promise()
            .query(sql, info)
            .then((rows) => {
                return rows;
            });
    },
};

module.exports = Post;
