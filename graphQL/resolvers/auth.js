const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { getMaxListeners } = require('../../models/user');
const User = require('../../models/user');

module.exports = {
    adaugaUser: async args => {
        try {
            // const existingUser = await User.findOne({$or: [{ 
            //         username: args.userInput.username 
            //     }, { 
            //         email: args.userInput.email
            //     }]
            // });
            // if (existingUser) {
            //     if (existingUser.username === args.userInput.username && existingUser.email === args.userInput.email) {
            //         throw new Error('Acest username si acest email au un cont asociat.');
            //     }
            //     else {
            //         if (existingUser.username === args.userInput.username) {
            //             throw new Error('Acest username exista.');
            //         }
            //         if (existingUser.email === args.userInput.email) {
            //             throw new Error('Acest email are un cont asociat.');
            //         }
            //     }
            // }
            
            const hashedPassword = await bcrypt.hash(args.userInput.parola, 12);

            const user = new User({
                username: args.userInput.username,
                parola: hashedPassword,
                nume: args.userInput.nume,
                prenume: args.userInput.prenume,
                telefon: args.userInput.telefon,
                email: args.userInput.email,
                email_tutore: args.userInput.email_tutore,
                clasa:args.userInput.clasa,
                role: "user",
                confirmed: false
            });
            const result = await user.save();

            
            return { ...result._doc, parola: null, _id: result.id };
        }   catch(err) {
            throw err;
        }
    },

    login: async ({ email, parola }) => {
        const user = await User.findOne({ email: email });
        if (!user) {
          throw new Error('Acest user nu exista!');
        }

        const isEqual = await bcrypt.compare(parola, user.parola);
        if (!isEqual) {
          throw new Error('Parola este incorecta!');
        }
        
        if(!user.confirmed) {
            var err = new Error();
            err.status = 401;
            return err
            // return err.status(401).json({ error: "Confirmati." });
        }
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          'somesupersecretkey',
          {
            expiresIn: '1h'
          }
        );
        return { userId: user.id, token: token, tokenExpiration: 1, role: user.role };
      },

    detaliiUser: async (args, req) => {
        // if (!req.isAuth) {
        //   throw new Error('Unauthenticated!');
        // }
        try {
          const detalii_user = await User.find();
          return detalii_user.map(detalii_user => {
            return { ...detalii_user._doc, _id: detalii_user.id };
        });
        } catch (err) {
          throw err;
        }
      }
};