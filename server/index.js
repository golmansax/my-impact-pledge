import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import React from 'react';
import HomePage from '../webpack/build/home_page';
import nodemailer from 'nodemailer';
import mailgunTransport from 'nodemailer-mailgun-transport';

require('dotenv').load();

const server = express();

server.use(express.static(path.resolve(__dirname, '..', 'webpack', 'build')));
server.use(bodyParser.urlencoded({ extended: false }));

server.get('/', (req, res) => {
  const html = `<!DOCTYPE html>${React.renderToStaticMarkup(<HomePage/>)}`;
  res.send(html);
});

server.post('/contacts', (req, res, next) => {
  const transporter = nodemailer.createTransport(mailgunTransport({
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
  }));

  transporter.sendMail({
    from: {
      name: req.body.name,
      email: req.body.email,
    },
    to: process.env.DEFAULT_EMAIL,
    subject: 'Contact from My Impact Pledge',
    text: req.body.comment,
  }, (err) => {
    if (err) {
      next(new Error('Could not send email'));
    } else {
      res.json({});
    }
  });
});

server.use((err, req, res) => {
  if (process.env.NODE_ENV !== 'development') {
    delete err.stack;
  }

  res.status(err.statusCode || 500).json({ error: err.message });
});

export default server;
