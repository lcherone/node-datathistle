# Datathistle API - NodeJS Client

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard) [![NPM](https://nodei.co/npm/node-datathistle.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/node-datathistle/)
[![Build Status](https://travis-ci.org/lcherone/node-datathistle.svg?branch=master)](https://travis-ci.org/lcherone/node-datathistle)


A simple no dependency [datathistle](http://datathistle.com) API client.

## :arrow_forward: Install

Install the package with npm:

``` bash
$ npm i node-datathistle
```

## :clipboard: Usage

Set an enviroment variable called `DATATHISTLE_API_KEY` with your API key, or pass it when invoking.

### Setup

``` javascript
// if you set `process.env.DATATHISTLE_API_KEY`
const datathistle = new (require('node-datathistle'))()

// else pass it
const datathistle = new (require('node-datathistle'))('YOUR_API_KEY')
```

### Search

See https://api.datathistle.com/assets/doc/#api-Search-Search for available query parameters, responses shown in the docs are in `result.data` as shown below.

``` javascript
// do a search for Abbey Theatre
let result = await datathistle.search({
   query: 'Abbey Theatre'
})

//
console.log(result.status) 
// 200

//
console.log(result.quota)
// Object { limit: '1000', remaining: '983', reset: '1660484608' }

//
console.log(result.data)
/*
Array [
    Object {
      event_id: 'ac1853cd-80c3-2f6d-f316-5926001cc718',
      name: 'Funhouse Comedy Club 22nd July',
      tags: Array [ 'comedy' ],
      place_id: 'f654b851-1ef1-605a-1feb-1e450000fa37',
      start_ts: '2022-07-22T19:15:00.000Z',
      end_ts: '2022-07-22T19:15:00.000Z',
      place_name: 'Abbey Theatre',
      town: 'Nuneaton',
      postal_code: 'CV11 5DB',
      lat: '52.52299',
      lng: '-1.47500',
      performance_count: 1
    },
    ...
]
*/
```

## :lock: Testing

``` bash
$ npm test
```

## :copyright: License

The MIT License (MIT). Please see [License File](https://github.com/lcherone/node-datathistle/blob/master/LICENSE) for more information.
