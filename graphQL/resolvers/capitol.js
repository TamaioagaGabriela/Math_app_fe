const Capitol = require('../../models/capitol');

module.exports = {
    capitole: async () => {
        try {
            const capitole =  await Capitol.find()
            return capitole.map(capitol => {
                return { ...capitol._doc, _id: capitol.id };
            });
        }   catch(err){
            throw err;
        }
    },

    adaugaCapitol: async args => {
        try {
            const capitol = new Capitol({
                titlu: args.capitolInput.titlu,
                clasa: args.capitolInput.clasa
            });
            const result = await capitol.save();
            return {...result._doc, _id: capitol.id};
        }catch(err) {
            console.log(err);
            throw err;
        };
    }


};