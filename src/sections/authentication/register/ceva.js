let requestBody = {
  query: `
      mutation adaugaUser($username: String!, $parola: String!, $nume: String!, $prenume: String!, $telefon: String!, $email: String!) {
        adaugaUser(userInput: {username: $username, parola: $parola, nume: $nume, prenume: $prenume, telefon: $telefon, email: $email}) {
          _id
          nume
          prenume
          email
        }
      }
      `,
  variables: {
    username: username,
    parola: parola,
    nume: nume,
    prenume: prenume,
    telefon: telefon,
    email: email
  }
};
