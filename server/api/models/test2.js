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
        // .catch((err) => {
        //     console.log(err);
        // });
    },
};

module.exports = Test;
