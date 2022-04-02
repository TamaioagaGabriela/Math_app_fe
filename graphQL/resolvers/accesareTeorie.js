const AccesareTeorie = require('../../models/accesareTeorie');

module.exports = {
    accesariTeorie: async () => {
        try {
            const accesariTeorie =  await AccesareTeorie.find()
            return accesariTeorie.map(accesareTeorie => {
               user = require('./merge');
               return user.transformAccesareTeorie(accesareTeorie);
            });
        }   catch(err){
            throw err;
        }
    },

    adaugaAccesareTeorie: async (args, req) => {
        try {
            const accesareTeorie = new AccesareTeorie({
                teorie: args.accesareTeorieInput.teorie_id,
                user: "624622b826d81302468d69c4" //req.userId
            });
            const result = await accesareTeorie.save();

            user = require('./merge');

            return user.transformAccesareTeorie(result);
        }catch(err) {
            console.log(err);
            throw err;
        };
    }


};