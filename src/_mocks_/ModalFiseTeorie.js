import { Box, Card, Link, Typography, Stack, Button, Grid, CardMedia } from '@mui/material';
import React from 'react';
import './ModalTerenuri.css';

const modal = (props) => (
  <div className="modal">
    <header className="modal__header">
      <h1>{props.title}</h1>
    </header>
    <section className="modal__content">{props.children}</section>

    <Stack
      direction="row"
      flexWrap="wrap-reverse"
      alignItems="center"
      justifyContent="space-between"
      margin="15px"
      sx={{ mb: 5 }}
    >
      {props.canCancel && (
        <Button className="btn" onClick={props.onCancel}>
          Inapoi
        </Button>
      )}
      <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }} justifyContent="flex-end">
        {props.canConfirm && (
          <Button className="btn" onClick={props.onConfirm}>
            Adauga Teorie
          </Button>
        )}
      </Stack>
    </Stack>
  </div>
);

export default modal;
