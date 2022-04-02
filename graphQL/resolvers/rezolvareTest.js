const RezolvareTest = require('../../models/rezolvareTest');

module.exports = {
    rezolvariTeste: async () => {
        try {
            const rezolvariTeste =  await RezolvareTest.find()
            return rezolvariTeste.map(rezolvareTest => {
               user = require('./merge');
               return user.transformRezolvareTest(rezolvareTest);
            });
        }   catch(err){
            throw err;
        }
    },

    adaugaRezolvareTest: async (args, req) => {
        try {
            const rezolvareTest = new RezolvareTest({
                test: args.rezolvareTestInput.test_id,
                user: "624622b826d81302468d69c4", //req.userId
                raspunsuri_user: args.rezolvareTestInput.raspunsuri_user,
                punctaj: "80%"
            });
            const result = await rezolvareTest.save();

            user = require('./merge');

            return user.transformRezolvareTest(result);
        }catch(err) {
            console.log(err);
            throw err;
        };
    }


};