const Subcapitol = require('../../models/subcapitol');

module.exports = {
    subcapitole: async () => {
        try {
            const subcapitole =  await Subcapitol.find()
            return subcapitole.map(subcapitol => {
                return { ...subcapitol._doc, _id: subcapitol.id };
            });
        }   catch(err){
            throw err;
        }
    },

    adaugaSubcapitol: async args => {
        try {
            const subcapitol = new Subcapitol({
                titlu: args.subcapitolInput.titlu,
                capitol_id: args.subcapitolInput.capitol_id
            });
            const result = await subcapitol.save();
            return {...result._doc, _id: subcapitol.id};
        }catch(err) {
            console.log(err);
            throw err;
        };
    }


};