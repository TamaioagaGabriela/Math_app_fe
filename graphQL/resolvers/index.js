const authResolver = require('./auth');
const capitolResolver = require('./capitol');
const subcapitolResolver = require('./subcapitol');
const teorieResolver = require('./teorie');
const fisaFormuleResolver = require('./fisaFormule');
const exercitiuResolver = require('./exercitiu');
const testResolver = require('./test');
const rezolvareTestResolver = require('./rezolvareTest');
const rezolvareExercitiuResolver = require('./rezolvareExercitiu');
const accesareFisaResolver = require('./accesareFisa');
const accesareTeorieResolver = require('./accesareTeorie');


const rootResolver = {
    ...authResolver,
    ...capitolResolver,
    ...subcapitolResolver,
    ...teorieResolver,
    ...fisaFormuleResolver,
    ...exercitiuResolver,
    ...testResolver,
    ...rezolvareTestResolver,
    ...rezolvareExercitiuResolver,
    ...accesareFisaResolver,
    ...accesareTeorieResolver
};

module.exports = rootResolver;