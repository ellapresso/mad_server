const db = require('../../config/database');

const Test = {
    getTest: () => {
        return db.madDb
            .promise()
            .query('select ')
            .then(([rows]) => {
                console.log('row');
                return rows;
            });
        /** 오류처리를 컨트롤러로 보냄 */
        // .catch((err) => {
        //     console.log(err);
        // });
    },
};

module.exports = Test;
