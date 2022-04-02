const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Capitol {
        _id: ID!
        titlu: String!
        clasa: String!
    }

    type Subcapitol {
        _id: ID!
        capitol_id: ID!
        titlu: String!
    }

    type FisaFormule {
        _id: ID!
        subcapitol_id: ID!
        titlu: String!
        descriere: String
    }

    type Teorie {
        _id: ID!
        subcapitol_id: ID!
        titlu: String!
        descriere: String
        link_video: String
    }

    type Exercitiu {
        _id: ID!
        subcapitol_id: ID!
        rezolvare: String!
        varianta1: String!
        varianta2: String!
        varianta3: String!
        varianta4: String!
        raspuns_corect: String!
        nivel_dif: String!
    }

    type Test {
        _id: ID!
        capitol_id: ID!
        exercitiu1_id: ID!
        exercitiu2_id: ID!
        exercitiu3_id: ID!
        exercitiu4_id: ID!
        exercitiu5_id: ID!
        exercitiu6_id: ID!
        exercitiu7_id: ID!
        exercitiu8_id: ID!
        exercitiu9_id: ID!
    }

    type User {
        _id: ID!
        username: String!
        parola: String!
        nume: String!
        prenume: String!
        email: String!
        email_tutore: String!
        clasa: String!
        role: String!
        confirmed: Boolean
    }

    type AccesareFisa {
        _id: ID!
        fisa: FisaFormule!
        user: User!
        createdAt: String!
        updatedAt: String!
    }

    type AccesareTeorie {
        _id: ID!
        teorie: Teorie!
        user: User!
        createdAt: String!
        updatedAt: String!
    }
    
    type RezolvareTest {
        _id: ID!
        test: Test!
        user: User!
        punctaj: String!
        raspunsuri_user: [String!]!
        createdAt: String!
        updatedAt: String!
    }

    type RezolvareExercitiu {
        _id: ID!
        exercitiu: Exercitiu!
        user: User!
        status: String!
        raspuns_user: String!
        createdAt: String!
        updatedAt: String!
    }
 
    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
        role: String!
      }

    input CapitolInput {
        titlu: String!
        clasa: String!
    }

    input SubcapitolInput {
        capitol_id: ID!
        titlu: String!
    }

    input FisaFormuleInput {
        subcapitol_id: ID
        titlu: String
        descriere: String
    }

    input TeorieInput {
        subcapitol_id: ID
        titlu: String!
        descriere: String
        link_video: String
    }

    input ExercitiuInput {
        subcapitol_id: ID
        rezolvare: String!
        varianta1: String!
        varianta2: String!
        varianta3: String!
        varianta4: String!
        raspuns_corect: String!
        nivel_dif: String!
    }

    input TestInput {
        capitol_id: ID
        exercitiu1_id: ID!
        exercitiu2_id: ID!
        exercitiu3_id: ID!
        exercitiu4_id: ID!
        exercitiu5_id: ID!
        exercitiu6_id: ID!
        exercitiu7_id: ID!
        exercitiu8_id: ID!
        exercitiu9_id: ID!
    }

    input UserInput {
        username: String!
        parola: String!
        nume: String!
        prenume: String!
        email: String!
        email_tutore: String!
        clasa: String!
    }

    input RezolvareExercitiuInput {
        exercitiu_id: ID!
        raspuns_user: String!
    }
    
    input RezolvareTestInput {
        test_id: ID!
        raspunsuri_user: [String!]!
    }

    input AccesareFisaInput{
        fisa_id: ID!
    } 

    input AccesareTeorieInput{
        teorie_id: ID!
    }

    type RootQuery {
        capitole: [Capitol!]!
        subcapitole: [Subcapitol!]!
        teorie: [Teorie]
        fiseFormule: [FisaFormule!]!
        teste: [Test!]!
        exercitii: [Exercitiu]!
        detaliiUser: [User!]!
        accesariFise: [AccesareFisa!]!
        accesariTeorie: [AccesareTeorie!]!
        rezolvariTeste: [RezolvareTest!]!
        rezolvariExercitii: [RezolvareExercitiu!]!
        login(email: String!, parola: String!): AuthData!
    }

    type RootMutation {
        adaugaCapitol(capitolInput: CapitolInput): Capitol
        adaugaSubcapitol(subcapitolInput: SubcapitolInput): Subcapitol
        adaugaTeorie(teorieInput: TeorieInput): Teorie
        adaugaFisaFormule(fisaFormuleInput: FisaFormuleInput): FisaFormule
        adaugaExercitiu(exercitiuInput: ExercitiuInput): Exercitiu
        adaugaTest(testInput: TestInput): Test
        adaugaUser(userInput: UserInput): User
        
        adaugaRezolvareExercitiu(rezolvareExercitiuInput: RezolvareExercitiuInput): RezolvareExercitiu!
        adaugaRezolvareTest(rezolvareTestInput: RezolvareTestInput): RezolvareTest!
        adaugaAccesareTeorie(accesareTeorieInput: AccesareTeorieInput): AccesareTeorie!
        adaugaAccesareFisa(accesareFisaInput: AccesareFisaInput): AccesareFisa!

        stergeTeorie(teorieId: ID!): Subcapitol!
        stergeFisaFormule(fisaFormuleId: ID!): Subcapitol!
        stergeTest(testId: ID!): Capitol!
        stergeExercitiu(exercitiuId: ID!): Subcapitol!

        modificaTeorie(teorieId: ID!, input: TeorieInput): Teorie!
        modificaFisaFormule(fisaFormuleId: ID!, input: FisaFormuleInput): FisaFormule!
        modificaTest(testId: ID!, input: TestInput): Test!
        modificaExercitiu(exercitiuId: ID!, input: ExercitiuInput): Exercitiu!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)