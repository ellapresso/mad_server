'use strict';

const DB = require('../../config/database');
/** 테스트를 위해 일부러 오류낸 페이지 */
const Test = {
    getTest: () => {
        return DB.madDb
            .promise()
            .query('select ')
            .then(([rows]) => {
                return rows;
            }).then(() => DB.end());
        /** 오류처리를 컨트롤러로 보냄 */
        // .catch((err) => {
        //     console.log(err);
        // });
    },
};

module.exports = Test;
