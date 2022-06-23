import { useStateIfMounted } from 'use-state-if-mounted';
import { useIsMounted } from 'usehooks-ts';
// material
import { useRef, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Badge } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
// component
import Iconify from '../../../components/Iconify';
import ExercitiiGresiteDB from '../../../_mocks_/ExercitiiGresiteDB';
import AuthContext from '../../../context/auth-context';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 999,
  right: 0,
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(16),
  height: theme.spacing(5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  boxShadow: theme.customShadows.z20,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
  borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 0.72 }
}));

// ----------------------------------------------------------------------

export default function CartWidget() {
  const context = useContext(AuthContext);

  // const unmounted = useRef(false);
  // useEffect(() => {
  //   unmounted.current = true;
  // }, []);

  // !!!
  const [exercitiiGresiteCount, setExercitiiGresiteCount] = useState([]);
  // const [exercitiiGresiteCount, setExercitiiGresiteCount] = useIsMounted([]);
  // const [exercitiiGresiteCount, setExercitiiGresiteCount] = useStateIfMounted([]);
  // !!!

  const navigate = useNavigate();

  const fetchExercitiiGresite = async () => {
    const requestBody = {
      query: `
        query{
          getExercitiiGresite{
            _id
            exercitiu{
               _id
              subcapitol_id
              cerinta
              rezolvare
              varianta1
              varianta2
              varianta3
              varianta4
              raspuns_corect
              nivel_dif
            }
            user{
              _id
            }
            status
            raspuns_user
            createdAt
          }
        }
        `
    };
    const tkn = context.token;
    const abortController = new AbortController();

    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tkn}`
      },
      signal: abortController.signal
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        // console.log(resData);

        // !!!
        // asta iti cauzeaza problema, e facut update-ul pe state gresit si se face un loop care genereaza timpi mari de incarcare din cauza procesarii continue :(
        setExercitiiGresiteCount(resData.data.getExercitiiGresite);

        // incercare 3

        // incercare 2
        // console.log('curent ', exercitiiGresiteCount.current);
        // if (exercitiiGresiteCount.current) {
        //   setExercitiiGresiteCount(resData.data.getExercitiiGresite);
        // }

        // console.log('!unmounted.current', !unmounted.current);
        // if (unmounted.current) {
        //   setExercitiiGresiteCount(resData.data.getExercitiiGresite);
        // }

        // incercare 1
        // setExercitiiGresiteCount(['']);
        // !!!

        console.log('in fetch exercitiiGresiteCount', exercitiiGresiteCount);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        console.log(err);
      });

    return () => {
      abortController.abort(); // stop the query by aborting on the AbortController on unmount
    };
  };

  const getExercitii = () => {
    fetchExercitiiGresite();
    // console.log('in card', exercitiiGresiteCount);
    return exercitiiGresiteCount.filter(
      (exercitiuRezolvat) => exercitiuRezolvat.user._id === context.userId
    ).length;
  };

  return (
    <RootStyle>
      <Tooltip
        title="Exercitii gresite"
        placement="bottom"
        text-color="red"
        background-color="black"
      >
        <Badge showZero badgeContent={getExercitii()} color="error" max={99}>
          <Iconify
            icon="ant-design:calculator-outlined"
            width={30}
            height={30}
            onClick={() => navigate('/dashboard/exercitii_gresite', { replace: true })}
          />
        </Badge>
      </Tooltip>
    </RootStyle>
  );
}
