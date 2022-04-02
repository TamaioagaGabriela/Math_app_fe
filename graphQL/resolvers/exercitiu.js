const Exercitiu = require('../../models/exercitiu');
const Subcapitol = require('../../models/subcapitol');

module.exports = {
    exercitii: async () => {
        try {
            const exercitii =  await Exercitiu.find()
            return exercitii.map(exercitiu => {
                return { ...exercitiu._doc, _id: exercitiu.id };
            });
        }   catch(err){
            throw err;
        }
    },

    adaugaExercitiu: async args => {
        try {
            const exercitiu = new Exercitiu({
                rezolvare: args.exercitiuInput.rezolvare,
                varianta1: args.exercitiuInput.varianta1,
                varianta2: args.exercitiuInput.varianta2,
                varianta3: args.exercitiuInput.varianta3,
                varianta4: args.exercitiuInput.varianta4,
                raspuns_corect: args.exercitiuInput.raspuns_corect,
                nivel_dif: args.exercitiuInput.nivel_dif,
                subcapitol_id: args.exercitiuInput.subcapitol_id
            });
            const result = await exercitiu.save();
            return {...result._doc, _id: exercitiu.id};
        }catch(err) {
            console.log(err);
            throw err;
        };
    },

    stergeExercitiu: async (args, req) => {
        // if (!req.isAuth) {
            // throw new Error('Nu sunteti autentificat.');
        //   }
        try {
            const exercitiu = await Exercitiu.findById(args.exercitiuId);
            console.log("TEST  " + args.exercitiuId)
            await Exercitiu.deleteOne({_id: args.exercitiuId});
            const subcapitol = await Subcapitol.findById(exercitiu.subcapitol_id);
            return subcapitol;
        }   catch(err) {
            throw err;
        }
    },

    modificaExercitiu: async (args, req) => {
        // if (!req.isAuth) {
            // throw new Error('Nu sunteti autentificat.');
        //   }
        try {
            const exercitiu = await Exercitiu.findById(args.exercitiuId);
            //exercitiu.subcapitol_id = args.input.subcapitol_id;
            exercitiu.rezolvare = args.input.rezolvare;
            exercitiu.varianta1 = args.input.varianta1;
            exercitiu.varianta2 = args.input.varianta2;
            exercitiu.varianta3 = args.input.varianta3;
            exercitiu.varianta4 = args.input.varianta4;
            exercitiu.raspuns_corect = args.input.raspuns_corect;
            exercitiu.nivel_dif = args.input.nivel_dif;
            await exercitiu.save();
            return exercitiu;
        }   catch(err) {
            throw err;
        }
    }


};