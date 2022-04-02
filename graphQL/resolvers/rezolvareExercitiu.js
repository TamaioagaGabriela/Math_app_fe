const RezolvareExercitiu = require('../../models/rezolvareExercitiu');

module.exports = {
    rezolvariExercitii: async () => {
        try {
            const rezolvariExercitii =  await RezolvareExercitiu.find()
            return rezolvariExercitii.map(rezolvareExercitiu => {
               user = require('./merge');
               return user.transformRezolvareExercitiu(rezolvareExercitiu);
            });
        }   catch(err){
            throw err;
        }
    },

    adaugaRezolvareExercitiu: async (args, req) => {
        try {
            const rezolvareExercitiu = new RezolvareExercitiu({
                exercitiu: args.rezolvareExercitiuInput.exercitiu_id,
                raspuns_user: args.rezolvareExercitiuInput.raspuns_user,
                user: "624622b826d81302468d69c4", //req.userId
                status: "CORECT"
            });
            const result = await rezolvareExercitiu.save();

            user = require('./merge');

            return user.transformRezolvareExercitiu(result);
        }catch(err) {
            console.log(err);
            throw err;
        };
    }


};