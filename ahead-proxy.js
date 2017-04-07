const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const request = require('request');
const apicache = require('apicache');

express()
    .use(cors())
    .use(morgan("tiny"))
    .use('/mustang', apicache.middleware("10 seconds"), (req, res) => request.get('http://mustang:3000'+req.path).pipe(res)) // this should be yet cached
    .listen(3000)
;
