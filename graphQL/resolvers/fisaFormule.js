const FisaFormule = require('../../models/fisaFormule');
const Subcapitol = require('../../models/subcapitol');


module.exports = {
    fiseFormule: async () => {
        try {
            const fiseFormule =  await FisaFormule.find()
            return fiseFormule.map(fisaFormule => {
                return { ...fisaFormule._doc, _id: fisaFormule.id };
            });
        }   catch(err){
            throw err;
        }
    },

    adaugaFisaFormule: async args => {
        try {
            const fisaFormule = new FisaFormule({
                titlu: args.fisaFormuleInput.titlu,
                descriere: args.fisaFormuleInput.descriere,
                subcapitol_id: args.fisaFormuleInput.subcapitol_id
            });
            const result = await fisaFormule.save();
            return {...result._doc, _id: fisaFormule.id};
        }catch(err) {
            console.log(err);
            throw err;
        };
    },

    stergeFisaFormule: async (args, req) => {
        // if (!req.isAuth) {
            // throw new Error('Nu sunteti autentificat.');
        //   }
        try {
            const fisaFormule = await FisaFormule.findById(args.fisaFormuleId);
            console.log("TEST  " + args.fisaFormuleId)
            await FisaFormule.deleteOne({_id: args.fisaFormuleId});
            const subcapitol = await Subcapitol.findById(fisaFormule.subcapitol_id);
            return subcapitol;
        }   catch(err) {
            throw err;
        }
    },

    modificaFisaFormule: async (args, req) => {
        // if (!req.isAuth) {
            // throw new Error('Nu sunteti autentificat.');
        //   }
        try {
            const fisaFormule = await FisaFormule.findById(args.fisaFormuleId);
            //fisaFormule.subcapitol_id = args.input.subcapitol_id;
            fisaFormule.titlu = args.input.titlu;
            fisaFormule.descriere = args.input.descriere;
            await fisaFormule.save();
            return fisaFormule;
        }   catch(err) {
            throw err;
        }
    }


};