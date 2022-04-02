const Test = require('../../models/test');
const Capitol = require('../../models/capitol');
const Exercitiu = require('../../models/exercitiu');

module.exports = {
    teste: async () => {
        try {
            const teste =  await Test.find()
            return teste.map(test => {
                return { ...test._doc, _id: test.id };
            });
        }   catch(err){
            throw err;
        }
    },

    adaugaTest: async args => {
        try {
            const test = new Test({
                capitol_id: args.testInput.capitol_id,
                exercitiu1_id: args.testInput.exercitiu1_id,
                exercitiu2_id: args.testInput.exercitiu2_id,
                exercitiu3_id: args.testInput.exercitiu3_id,
                exercitiu4_id: args.testInput.exercitiu4_id,
                exercitiu5_id: args.testInput.exercitiu5_id,
                exercitiu6_id: args.testInput.exercitiu6_id,
                exercitiu7_id: args.testInput.exercitiu7_id,
                exercitiu8_id: args.testInput.exercitiu8_id,
                exercitiu9_id: args.testInput.exercitiu9_id
            });
            const result = await test.save();
            return {...result._doc, _id: test.id};
        }catch(err) {
            console.log(err);
            throw err;
        };
    },

    stergeTest: async (args, req) => {
        // if (!req.isAuth) {
            // throw new Error('Nu sunteti autentificat.');
        //   }
        try {
            const test = await Test.findById(args.testId);
            const capitol = await Capitol.findById(test.capitol_id);
            console.log("TEST  " + args.testId)
            await Test.deleteOne({_id: args.testId});
            return capitol;
        }   catch(err) {
            throw err;
        }
    },

    modificaTest: async (args, req) => {
        // if (!req.isAuth) {
            // throw new Error('Nu sunteti autentificat.');
        //   }
        try {
            const test = await Test.findById(args.testId);
            test.exercitiu1_id = args.input.exercitiu1_id;
            test.exercitiu2_id = args.input.exercitiu2_id;
            test.exercitiu3_id = args.input.exercitiu3_id;
            test.exercitiu4_id = args.input.exercitiu4_id;
            test.exercitiu5_id = args.input.exercitiu5_id;
            test.exercitiu6_id = args.input.exercitiu6_id;
            test.exercitiu7_id = args.input.exercitiu7_id;
            test.exercitiu8_id = args.input.exercitiu8_id;
            test.exercitiu9_id = args.input.exercitiu9_id;

            await test.save();
            return test;
        }   catch(err) {
            throw err;
        }
    }


};