import { useStateIfMounted } from 'use-state-if-mounted';
import { useIsMounted } from 'usehooks-ts';
// material
import React, { useRef, useState, useEffect, useContext, Component } from 'react';
import { useNavigate, Link as RouterLink, Navigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Badge, Link } from '@mui/material';
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

class ExercitiiGresiteWidget extends Component {
  static context = AuthContext;

  constructor(props) {
    super(props);

    this.state = {
      exercitiiGresiteCount: []
    };
  }

  componentDidMount() {
    this.fetchExercitiiGresite();
  }

  componentWillUnmount() {
    this.state.isActive = false;
  }

  fetchExercitiiGresite = () => {
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
    const tkn = this.context.token;
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
        this.setExercitiiGresiteCount(resData.data.getExercitiiGresite);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setExercitiiGresiteCount = async (listaRezolvariExercitii) => {
    await this.setState((prevState) => ({
      exercitiiGresiteCount: listaRezolvariExercitii.filter(
        (exercitiuRezolvat) => exercitiuRezolvat.user._id === this.context.userId
      ).length
    }));
  };

  render() {
    const exercitiiGresiteCountVariabila = this.state.exercitiiGresiteCount;
    return (
      <RootStyle>
        <Tooltip
          title="Exercitii gresite"
          placement="bottom"
          text-color="red"
          background-color="black"
        >
          <Link
            to="/dashboard/exercitii_gresite"
            color="inherit"
            underline="none"
            component={RouterLink}
          >
            <Badge showZero badgeContent={exercitiiGresiteCountVariabila} color="error" max={99}>
              <Iconify icon="ant-design:calculator-outlined" width={30} height={30} />
            </Badge>
          </Link>
        </Tooltip>
      </RootStyle>
    );
  }
}
ExercitiiGresiteWidget.contextType = AuthContext;
export default ExercitiiGresiteWidget;
