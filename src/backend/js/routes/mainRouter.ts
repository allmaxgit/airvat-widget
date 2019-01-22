// const express = require('express');
import * as express from 'express';

const index = require('./main/index');
const router = express.Router();

router.get('/', index);

export default router;
