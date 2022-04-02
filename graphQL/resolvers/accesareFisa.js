const AccesareFisa = require('../../models/accesareFisa');
// var user = require('./merge');

module.exports = {
    accesariFise: async () => {
        try {
            const accesariFise =  await AccesareFisa.find()
            return accesariFise.map(accesareFisa => {
               user = require('./merge');
               return user.transformAccesareFisa(accesareFisa);
            });
        }   catch(err){
            throw err;
        }
    },

    adaugaAccesareFisa: async (args, req) => {
        try {
            const accesareFisa = new AccesareFisa({
                fisa: args.accesareFisaInput.fisa_id,
                user: "624622b826d81302468d69c4" //req.userId
            });
            const result = await accesareFisa.save();

            user = require('./merge');

            return user.transformAccesareFisa(result);
        }catch(err) {
            console.log(err);
            throw err;
        };
    }


};