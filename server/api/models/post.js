/* eslint-disable max-len */
'use strict';

const DB = require('../../config/database');

const madDatabase = DB.madDb;
const Post = {
    getPost: (userId) => {
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
        // 최종 쿼리
        sql = 'select * from (' + sql + ') a group by `pno` order by `pno` desc';
        return madDatabase
            .promise()
            .query(sql)
            .then(([rows]) => {
                return rows;
            });
    },
    setPost: (contents) => {
        return madDatabase
            .promise()
            .query('INSERT INTO `posts` ( `title`, `contents`, `writer`, `wrDate`) VALUES (?,?, ?, ?)', contents)
            .then(([rows]) => {
                return rows;
            });
    },
    setHash: (id, hashes) => {
        if (hashes) {
            const hashArr = hashes.split(',');
            let sql = 'insert into hashes (pno,hContent) values';
            hashArr.forEach((i) => {
                sql += `(${id},'${i}'),`;
            });
            sql = sql.substring(0, sql.length - 1);
            return madDatabase
                .promise()
                .query(sql)
                .then(([rows]) => {
                    return rows;
                });
        }
        return null;
    },
    updatePost: (contents) => {
        return madDatabase
            .promise()
            .query('UPDATE `posts` SET `title`=?, `contents`=?, `writer`=?, `upDate`=? where pno =?', contents)
            .then(([rows]) => {
                return rows;
            });
    },
    deletePost: (delInfo) => {
        return madDatabase
            .promise()
            .query('UPDATE `posts` SET `isDel` = 1, `upDate`=? where `pno`=? and `writer`=?', delInfo)
            .then((rows) => {
                return rows;
            });
    },
    deleteHash: (delInfo) => {
        return madDatabase
            .promise()
            .query('UPDATE `hashes` SET `isDel` = 1, `upDate`=? where `pno`=? and `hContent`=?', delInfo)
            .then((rows) => {
                return rows;
            });
    },
    getContents: (info) => {
        return madDatabase
            .promise()
            .query('select `pno`, `title`, `nickname`, `contents`, `thumbnail_image`, `reg_date`, `update_day` from `posts` left join `users` on `posts`.`writer` = `users`.`id` where `pno` = ? and writer = ?', info)
            .then((rows) => {
                return rows;
            });
    },
};

module.exports = Post;
