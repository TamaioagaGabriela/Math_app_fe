// material
import { useRef, useState, useContext } from 'react';
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
  const [exercitiiGresiteCount, setExercitiiGresiteCount] = useState([]);
  const navigate = useNavigate();

  const fetchExercitiiGresite = () => {
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
    fetch('http://localhost:8000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tkn}`
      }
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then((resData) => {
        setExercitiiGresiteCount(resData.data.getExercitiiGresite);
        // console.log('in fetch exercitiiGresiteCount', exercitiiGresiteCount);
      })
      .catch((err) => {
        console.log(err);
      });
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
