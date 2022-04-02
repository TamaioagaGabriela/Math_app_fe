const e = require('express');
const RezolvareTest = require('../../models/rezolvareTest');
const Test = require('../../models/test');
const Exercitiu = require('../../models/exercitiu');
const RezolvareExercitiu = require('./rezolvareExercitiu')

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
            var nrExercitiiCorecte = 0;
            var test = await Test.findById(args.rezolvareTestInput.test_id);
            const exercitiu1 = await Exercitiu.findById(test.exercitiu1_id);
            const exercitiu2 = await Exercitiu.findById(test.exercitiu2_id);
            const exercitiu3 = await Exercitiu.findById(test.exercitiu3_id);
            const exercitiu4 = await Exercitiu.findById(test.exercitiu4_id);
            const exercitiu5 = await Exercitiu.findById(test.exercitiu5_id);
            const exercitiu6 = await Exercitiu.findById(test.exercitiu6_id);
            const exercitiu7 = await Exercitiu.findById(test.exercitiu7_id);
            const exercitiu8 = await Exercitiu.findById(test.exercitiu8_id);
            const exercitiu9 = await Exercitiu.findById(test.exercitiu9_id);
            if(args.rezolvareTestInput.raspunsuri_user[0] == exercitiu1.raspuns_corect)
                nrExercitiiCorecte++;
            if(args.rezolvareTestInput.raspunsuri_user[1] == exercitiu2.raspuns_corect)
                nrExercitiiCorecte++;
            if(args.rezolvareTestInput.raspunsuri_user[2] == exercitiu3.raspuns_corect)
                nrExercitiiCorecte++;
            if(args.rezolvareTestInput.raspunsuri_user[3] == exercitiu4.raspuns_corect)
                nrExercitiiCorecte++;
            if(args.rezolvareTestInput.raspunsuri_user[4] == exercitiu5.raspuns_corect)
                nrExercitiiCorecte++;
            if(args.rezolvareTestInput.raspunsuri_user[5] == exercitiu6.raspuns_corect)
                nrExercitiiCorecte++;
            if(args.rezolvareTestInput.raspunsuri_user[6] == exercitiu7.raspuns_corect)
                nrExercitiiCorecte++;
            if(args.rezolvareTestInput.raspunsuri_user[7] == exercitiu8.raspuns_corect)
                nrExercitiiCorecte++;
            if(args.rezolvareTestInput.raspunsuri_user[9] == exercitiu9.raspuns_corect)
                nrExercitiiCorecte++;
            const rezolvareTest = new RezolvareTest({
                test: args.rezolvareTestInput.test_id,
                user: "624622b826d81302468d69c4", //req.userId
                raspunsuri_user: args.rezolvareTestInput.raspunsuri_user,
                punctaj: nrExercitiiCorecte * 10 + 10
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