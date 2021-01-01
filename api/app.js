'use strict';
var express = require('express');
var axios = require('axios');

const app = express();

app.get('/api/', (req, res) => {
  res.json({ hello: 'world' });
});

app.get('/api/bootstrap', (req, res) => {
  axios
    .get(`https://draft.premierleague.com/api/bootstrap-static`)
    .then((payload) => {
      res.json(payload.data);
    });
});

app.get('/api/game', (req, res) => {
  axios.get(`https://draft.premierleague.com/api/game`).then((payload) => {
    res.json(payload.data);
  });
});

app.get('/api/leagues/:id', (req, res) => {
  axios
    .get(`https://draft.premierleague.com/api/league/${req.params.id}/details`)
    .then((payload) => {
      res.json(payload.data);
    });
});

app.get('/api/live/:week', (req, res) => {
  axios
    .get(`https://draft.premierleague.com/api/event/${req.params.week}/live`)
    .then((payload) => {
      res.json(payload.data);
    });
});

app.get('/api/picks/:id/:week', (req, res) => {
  axios
    .get(
      `https://draft.premierleague.com/api/entry/${req.params.id}/event/${req.params.week}`
    )
    .then((payload) => {
      if (payload.data) {
        res.json(payload.data);
      } else {
        return null;
      }
    });
});

app.get('/api/transactions/:week', (req, res) => {
  axios
    .get(
      `https://draft.premierleague.com/api/draft/league/${req.params.week}/transactions`
    )
    .then((payload) => {
      res.json(payload.data);
    });
});

module.exports = app;
