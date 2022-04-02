const Teorie = require('../../models/teorie');
const Subcapitol = require('../../models/subcapitol');

module.exports = {
    teorie: async () => {
        try {
            const teorie =  await Teorie.find()
            return teorie.map(teorie => {
                return { ...teorie._doc, _id: teorie.id };
            });
        }   catch(err){
            throw err;
        }
    },

    adaugaTeorie: async args => {
        try {
            const teorie = new Teorie({
                titlu: args.teorieInput.titlu,
                descriere: args.teorieInput.descriere,
                link_video: args.teorieInput.link_video,
                subcapitol_id: args.teorieInput.subcapitol_id
            });
            const result = await teorie.save();
            return {...result._doc, _id: teorie.id};
        }catch(err) {
            console.log(err);
            throw err;
        };
    },

    stergeTeorie: async (args, req) => {
        // if (!req.isAuth) {
            // throw new Error('Nu sunteti autentificat.');
        //   }
        try {
            const teorie = await Teorie.findById(args.teorieId);
            const subcapitol = await Subcapitol.findById(teorie.subcapitol_id);
            console.log("TEST  " + args.teorieId)
            await Teorie.deleteOne({_id: args.teorieId});
            // const subcapitol = await Subcapitol.findById(teorie.subcapitol_id);
            return subcapitol;
        }   catch(err) {
            throw err;
        }
    },

    modificaTeorie: async (args, req) => {
        // if (!req.isAuth) {
            // throw new Error('Nu sunteti autentificat.');
        //   }
        try {
            const teorie = await Teorie.findById(args.teorieId);
            //teorie.subcapitol_id = args.input.subcapitol_id;
            teorie.titlu = args.input.titlu;
            teorie.descriere = args.input.descriere;
            teorie.link_video = args.input.link_video;
            await teorie.save();
            return teorie;
        }   catch(err) {
            throw err;
        }
    }


};