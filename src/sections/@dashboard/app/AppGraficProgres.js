import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
import React, { useContext, useState } from 'react';
//
import { BaseOptionChart } from '../../../components/charts';
import AuthContext from '../../../context/auth-context';

// ----------------------------------------------------------------------

const teoriePercentageList = [];
const capitoleLabelsList = [];
const testePercentageList = [];
const exercitiiPercentageList = [];

const CHART_DATA = [
  {
    name: 'Exerciții',
    type: 'column',
    data: exercitiiPercentageList
    // [100, 89, 54, 76, 23, 41]
  },
  {
    name: 'Teorie',
    type: 'column',
    data: teoriePercentageList
    // [100, 70, 17, 59, 65, 33]
  },
  {
    name: 'Teste',
    type: 'column',
    data: testePercentageList
    // [100, 100, 70, 38, 0, 20]
  }
];

export default function AppGraficProgres() {
  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [0, 2, 3] },
    plotOptions: { bar: { columnWidth: '35%', borderRadius: 4 } },
    fill: { type: ['solid', 'gradient', 'solid'] },
    labels: capitoleLabelsList,
    // ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003'],
    scales: {
      y: {
        min: 0,
        max: 100,
        stepSize: 10
      },
      x: {
        fontSize: 4000,
        fontColor: 'black',
        ticks: {
          font: {
            size: 1,
            family: 'vazir'
          }
        }
      }
    },

    xaxis: {
      type: 'String',
      maxWidth: 900,
      ticks: {
        font: {
          size: 40
        }
      }
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5
    },

    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)}%`;
          }
          return '100%';
        }
      }
    }
  });

  const context = useContext(AuthContext);
  const [alreadyFetch, setAlreadyFetch] = useState(false);

  const [capitole, setCapitole] = useState([]);
  const [subcapitole, setSubcapitole] = useState([]);
  const [fiseTeorie, setFiseTeorie] = useState([]);
  const [accesariFiseTeorie, setAccesariFiseTeorie] = useState([]);
  const [teste, setTeste] = useState([]);
  const [rezolvariTeste, setRezolvariTeste] = useState([]);
  const [exercitii, setExercitii] = useState([]);
  const [rezolvariExercitii, setRezolvariExercitii] = useState([]);

  const fetchCapitole = () => {
    const requestBody = {
      query: `
        query{
            capitole{
                _id
                titlu
                clasa
            }
        }
        `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        setCapitole(resData.data.capitole);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchSubcapitole = () => {
    const requestBody = {
      query: `
        query{
            subcapitole{
                _id
                titlu
                capitol_id
            }
        }
        `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        setSubcapitole(resData.data.subcapitole);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchFiseTeorie = () => {
    const requestBody = {
      query: `
        query{
          teorie{
            _id
            titlu
            descriere
            link_video
            subcapitol_id
          }
        }
        `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        setFiseTeorie(resData.data.teorie);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAccesariFiseTeorie = () => {
    const requestBody = {
      query: `
        query{
            accesariTeorie{
              _id
              user {
                _id
              }  
              teorie{
                _id
                subcapitol_id
              }
              createdAt
              updatedAt  
            }
          }
        `
    };
    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        setAccesariFiseTeorie(resData.data.accesariTeorie);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchRezolvariTeste = () => {
    const requestBody = {
      query: `
        query{
           rezolvariTeste{
              _id
              test{
                _id
                capitol_id
              }
              user{
                _id
                email
              }
              punctaj
              raspunsuri_user
              createdAt
              updatedAt
            }
          }
        `
    };
    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        setRezolvariTeste(resData.data.rezolvariTeste);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTeste = () => {
    const requestBody = {
      query: `
        query{
            teste{
                _id
                capitol_id
            }
        }
        `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        setTeste(resData.data.teste);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchExercitii = () => {
    const requestBody = {
      query: `
        query{
        exercitii{
            _id
            cerinta
            subcapitol_id
            raspuns_corect
            nivel_dif
            }
        }
        `
    };

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        setExercitii(resData.data.exercitii);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchRezolvariExercitii = () => {
    const requestBody = {
      query: `
        query{
            rezolvariExercitii{
              _id
              exercitiu{
                _id
                subcapitol_id
                raspuns_corect
              }
              user{
                _id
              }
              status
              raspuns_user
              createdAt
              updatedAt
            }
          }
        `
    };
    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        setRezolvariExercitii(resData.data.rezolvariExercitii);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPercentageTeoriePerCapitol = (capitolId) => {
    const subcapitoleFiltrate = subcapitole.filter(
      (subcapitol) => subcapitol.capitol_id === capitolId
    );

    let count = 0;
    for (let i = 0; i < subcapitoleFiltrate.length; i += 1) {
      // toate accesarile unui user, filtrate in functie de capitol
      const accesariSubcapitole = accesariFiseTeorie.filter(
        (accesare) =>
          accesare.user._id === context.userId &&
          accesare.teorie.subcapitol_id === subcapitoleFiltrate[i]._id
      );
      if (accesariSubcapitole.length >= 1) count += 1;
    }
    if (Number.isNaN(parseInt((100 * count) / subcapitoleFiltrate.length, 10))) return 0;

    return parseInt((100 * count) / subcapitoleFiltrate.length, 10);
  };

  const getTeoriePercentage = () => {
    const capitoleFiltrate = capitole.filter((capitol) => capitol.clasa === context.clasa);

    if (teoriePercentageList !== []) {
      teoriePercentageList.length = 0;
    }
    if (capitoleLabelsList !== []) {
      capitoleLabelsList.length = 0;
    }
    for (let i = 0; i < capitoleFiltrate.length; i += 1) {
      capitoleLabelsList.push(capitoleFiltrate[i].titlu);
      teoriePercentageList.push(getPercentageTeoriePerCapitol(capitoleFiltrate[i]._id));
    }
  };

  const getPercentageTestPerCapitol = (capitolId) => {
    const testeFiltrate = teste.filter((test) => test.capitol_id === capitolId);

    // toate rezolvarile CORECTE ale unui user, filtrate in functie de capitolul testului
    const rezolvariTesteFiltrate = rezolvariTeste.filter(
      (rezolvare) =>
        rezolvare.user._id === context.userId && rezolvare.test.capitol_id === capitolId
    );

    const idTesteRezolvate = rezolvariTesteFiltrate.map((x) => x.test._id);
    const rezolvariTesteDistincte = [...new Set(idTesteRezolvate)];

    if (Number.isNaN(parseInt((100 * rezolvariTesteDistincte.length) / testeFiltrate.length, 10)))
      return 0;

    return parseInt((100 * rezolvariTesteDistincte.length) / testeFiltrate.length, 10);
  };

  const getTestePercentage = () => {
    const capitoleFiltrate = capitole.filter((capitol) => capitol.clasa === context.clasa);
    if (testePercentageList !== []) {
      testePercentageList.length = 0;
    }
    for (let i = 0; i < capitoleFiltrate.length; i += 1) {
      testePercentageList.push(getPercentageTestPerCapitol(capitoleFiltrate[i]._id));
    }
  };

  const getPercentageExercitiiPerSubcapitol = (subcapitolId) => {
    const exercitiiFiltrate = exercitii.filter(
      (exercitiu) => exercitiu.subcapitol_id === subcapitolId
    );
    // toate rezolvarile CORECTE ale unui user, filtrate in functie de subcapitol
    const rezolvariExercitiiFiltrate = rezolvariExercitii.filter(
      (rezolvare) =>
        rezolvare.user._id === context.userId &&
        rezolvare.status === 'CORECT' &&
        rezolvare.exercitiu.subcapitol_id === subcapitolId
    );
    const idExercitiiRezolvate = rezolvariExercitiiFiltrate.map((x) => x.exercitiu._id);
    const rezolvariExercitiiDistincte = [...new Set(idExercitiiRezolvate)];
    if (
      Number.isNaN(
        parseInt((100 * rezolvariExercitiiDistincte.length) / exercitiiFiltrate.length, 10)
      )
    )
      return 0;

    return parseInt((100 * rezolvariExercitiiDistincte.length) / exercitiiFiltrate.length, 10);
  };

  const getPercentageExercitiiPerCapitol = (capitolId) => {
    const subcapitoleFiltrate = subcapitole.filter(
      (subcapitol) => subcapitol.capitol_id === capitolId
    );
    let suma = 0;
    for (let i = 0; i < subcapitoleFiltrate.length; i += 1) {
      suma += getPercentageExercitiiPerSubcapitol(subcapitoleFiltrate[i]._id);
    }
    if (Number.isNaN(parseInt(suma / subcapitoleFiltrate.length, 10))) return 0;
    return parseInt(suma / subcapitoleFiltrate.length, 10);
  };

  const getExercitiiPercentage = () => {
    const capitoleFiltrate = capitole.filter((capitol) => capitol.clasa === context.clasa);
    if (exercitiiPercentageList !== []) {
      exercitiiPercentageList.length = 0;
    }
    for (let i = 0; i < capitoleFiltrate.length; i += 1) {
      exercitiiPercentageList.push(getPercentageExercitiiPerCapitol(capitoleFiltrate[i]._id));
    }
  };

  if (!alreadyFetch) {
    setAlreadyFetch(true);
    fetchCapitole();
    fetchSubcapitole();
    fetchFiseTeorie();
    fetchAccesariFiseTeorie();
    fetchTeste();
    fetchRezolvariTeste();
    fetchExercitii();
    fetchRezolvariExercitii();
  }

  getTeoriePercentage();
  getTestePercentage();
  getExercitiiPercentage();

  return (
    <Card>
      <CardHeader title="Progres personal" subheader={`clasa a ${context.clasa}-a`} />
      <Box sx={{ p: 3, pb: 5 }} dir="ltr">
        <ReactApexChart
          // marginBottom="40%"
          type="line"
          series={CHART_DATA}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
