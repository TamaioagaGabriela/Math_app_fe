const DataLoader = require('dataloader');
const FisaFormule = require('../../models/fisaFormule');
const Teorie = require('../../models/teorie');
const Exercitiu = require('../../models/exercitiu')
const Test = require('../../models/test')
const User = require('../../models/user');
const { accesareFisa } = require('./accesareFisa');
const { accesareTeorie } = require('./accesareTeorie');
const { dateToString } = require('../../helpers/date');



const fisaFormuleUnica = async fisaFormuleId => {
  try {
    console.log("fisaFormule");
    console.log(fisaFormuleId);
    const fisaFormule = await FisaFormule.findById(fisaFormuleId);
         return { ...fisaFormule._doc, _id: fisaFormule.id};
  } catch (err) {
    throw err;
  }
}; 

const teorieUnica = async fisaTeorieId => {
  try {
    console.log("teorie");
    console.log(fisaTeorieId);
    const teorie = await Teorie.findById(fisaTeorieId);
         return { ...teorie._doc, _id: teorie.id};
  } catch (err) {
    throw err;
  }
}; 

const getExercitiu = async exercitiuId => {
  try {
    console.log("exercitiu");
    console.log(exercitiuId);
    const exercitiu = await Exercitiu.findById(exercitiuId);
         return { ...exercitiu._doc, _id: exercitiu.id};
  } catch (err) {
    throw err;
  }
}; 

const getTest = async testId => {
  try {
    console.log("test");
    console.log(testId);
    const test = await Test.findById(testId);
         return { ...test._doc, _id: test.id};
  } catch (err) {
    throw err;
  }
}; 

const user = async userId => {
  try {
      // const userId = "624622b826d81302468d69c4"; 
      console.log("user");
      console.log(userId);
      const user = await User.findById(userId);
          return { ...user._doc, _id: user.id};
  }   catch(err) {
      throw err;
  }
};

module.exports = {
 transformAccesareFisa: function(accesareFisa) {
    return {
      ...accesareFisa._doc,
      _id: accesareFisa.id,
      user: user.bind(this, accesareFisa._doc.user),
      fisa: fisaFormuleUnica.bind(this, accesareFisa._doc.fisa),
      createdAt: dateToString(accesareFisa._doc.createdAt),
      updatedAt: dateToString(accesareFisa._doc.updatedAt)
    }; 
  },

  transformAccesareTeorie: function(accesareTeorie) {
    return {
      ...accesareTeorie._doc,
      _id: accesareTeorie.id,
      user: user.bind(this, accesareTeorie._doc.user),
      teorie: teorieUnica.bind(this, accesareTeorie._doc.teorie),
      createdAt: dateToString(accesareTeorie._doc.createdAt),
      updatedAt: dateToString(accesareTeorie._doc.updatedAt)
    }; 
  },

  transformRezolvareExercitiu: function(rezolvareExercitiu) {
    return {
      ...rezolvareExercitiu._doc,
      _id: rezolvareExercitiu.id,
      user: user.bind(this, rezolvareExercitiu._doc.user),
      exercitiu: getExercitiu.bind(this, rezolvareExercitiu._doc.exercitiu),
      createdAt: dateToString(rezolvareExercitiu._doc.createdAt),
      updatedAt: dateToString(rezolvareExercitiu._doc.updatedAt)
    }; 
  },

  transformRezolvareTest: function(rezolvareTest) {
    return {
      ...rezolvareTest._doc,
      _id: rezolvareTest.id,
      user: user.bind(this, rezolvareTest._doc.user),
      test: getTest.bind(this, rezolvareTest._doc.test),
      createdAt: dateToString(rezolvareTest._doc.createdAt),
      updatedAt: dateToString(rezolvareTest._doc.updatedAt)
    }; 
  }
}
exports.user = user;
exports.fisaFormuleUnica = fisaFormuleUnica;
exports.teorieUnica = teorieUnica;
exports.getExercitiu = getExercitiu;
exports.getTest = getTest;


