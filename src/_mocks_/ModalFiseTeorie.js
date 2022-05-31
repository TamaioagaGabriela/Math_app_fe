import { Box, Card, Link, Typography, Stack, Button, Grid, CardMedia } from '@mui/material';
import React from 'react';
import './ModalTerenuri.css';

const modal = (props) => (
  <Grid container spacing={0} direction="column" alignItems="center" justify="center">
    <Card marginBottom="0px">
      <header className="modal__header">
        <h1>{props.title}</h1>
      </header>
      <section className="modal__content">{props.children}</section>
      <Stack
        direction="row"
        flexWrap="wrap-reverse"
        alignItems="center"
        justifyContent="space-between"
        marginLeft="17px"
        marginRight="17px"
        marginBottom="20px"
      >
        {props.canCancel && (
          <Button size="medium" variant="outlined" className="btn" onClick={props.onCancel}>
            Inapoi
          </Button>
        )}
        <Stack direction="row" justifyContent="flex-end">
          {props.canConfirm && (
            <Button size="medium" variant="outlined" className="btn" onClick={props.onConfirm}>
              {props.numeButon}
            </Button>
          )}
        </Stack>
      </Stack>
    </Card>
  </Grid>
);

export default modal;
