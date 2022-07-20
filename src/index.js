/*
 +----------------------------------------------------------------------+
 | node-datathistle
 +----------------------------------------------------------------------+
 | Copyright (c)2022 (https://github.com/lcherone/node-datathistle)
 +----------------------------------------------------------------------+
 | This source file is subject to MIT License
 | that is bundled with this package in the file LICENSE.
 |
 | If you did not receive a copy of the license and are unable to
 | obtain it through the world-wide-web, please send an email
 | to lawrence@cherone.co.uk so we can send you a copy immediately.
 +----------------------------------------------------------------------+
 | Authors:
 |   Lawrence Cherone <lawrence@cherone.co.uk>
 +----------------------------------------------------------------------+
 */

const https = require('node:https')
const querystring = require('node:querystring')

/**
 * @link https://api.datathistle.com
 * @package lcherone/node-datathistle
 */
module.exports = class {
  /**
   * @link https://api.datathistle.com/my-account
   *
   * @param {String} API_KEY - A valid API key issued from datathistle (the link above)
   */
  constructor(API_KEY = '') {
    //
    this.key = API_KEY || process.env.DATATHISTLE_API_KEY || ''

    //
    this.version = 'v1'
    this.hostname = 'api.datathistle.com'
  }

  /**
   * Events
   *  - Searches events for matches based on parameters.
   *
   * @link: https://api.datathistle.com/assets/doc/#api-Places
   *
   * Usage find:
    ``` javascript
    const data = await datathistle.events({
      name: 'Abbey Theatre'
    })
    ```
   * Usage single:
    ``` javascript
    const data = await datathistle.events({
      id: 'f654b851-1ef1-605a-1feb-1e450000fa37' // event_id
    })
    ```
  *
  * @param {Object} params - View link for available query parameters
  * @returns {Promise} - Resolves to object: `{status: 200, quota: {}, result: [{...}, ...]}`
  */
  events(params = {}) {
    //
    return new Promise((resolve, reject) => {
      if (!this.key) {
        return reject(new Error('API key not set.'))
      }

      // path
      let path = '/' + this.version + '/events?' + querystring.stringify(params)
      // single place
      if (typeof params.id === 'string') {
        path = '/' + this.version + '/events/' + params.id
      }

      //
      https.request({
        hostname: this.hostname,
        path,
        port: 443,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + this.key
        }
      }, (res) => {
        //
        let data = ''
        res.on('data', function (chunk) {
          data += chunk
        })

        //
        res.on('end', () => {
          try {
            data = JSON.parse(data)
          } catch (e) {
            const err = new Error(e.message)
            err.status = res.statusCode
            err.quota = {
              limit: res.headers['x-ratelimit-limit'],
              remaining: res.headers['x-ratelimit-remaining'],
              reset: res.headers['x-ratelimit-reset']
            }
            return reject(err)
          }

          resolve({
            status: res.statusCode,
            quota: {
              limit: res.headers['x-ratelimit-limit'],
              remaining: res.headers['x-ratelimit-remaining'],
              reset: res.headers['x-ratelimit-reset']
            },
            data
          })
        })
      }).on('error', reject).end()
    })
  }

  /**
   * Places
   *  - Searches places for matches based on parameters.
   *
   * @link: https://api.datathistle.com/assets/doc/#api-Places
   *
   * Usage find:
   ``` javascript
    const data = await datathistle.places({
      name: 'Abbey Theatre'
    })
    ```
   * Usage single:
   ``` javascript
    const data = await datathistle.places({
      id: 'f654b851-1ef1-605a-1feb-1e450000fa37' // place_id
    })
    ```
   *
   * @param {Object} params - View link for available query parameters
   * @returns {Promise} - Resolves to object: `{status: 200, quota: {}, result: [{...}, ...]}`
   */
  places(params = {}) {
    //
    return new Promise((resolve, reject) => {
      if (!this.key) {
        return reject(new Error('API key not set.'))
      }

      // path
      let path = '/' + this.version + '/places?' + querystring.stringify(params)
      // single place
      if (typeof params.id === 'string') {
        path = '/' + this.version + '/places/' + params.id
      }

      //
      https.request({
        hostname: this.hostname,
        path,
        port: 443,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + this.key
        }
      }, (res) => {
        //
        let data = ''
        res.on('data', function (chunk) {
          data += chunk
        })

        //
        res.on('end', () => {
          try {
            data = JSON.parse(data)
          } catch (e) {
            const err = new Error(e.message)
            err.status = res.statusCode
            err.quota = {
              limit: res.headers['x-ratelimit-limit'],
              remaining: res.headers['x-ratelimit-remaining'],
              reset: res.headers['x-ratelimit-reset']
            }
            return reject(err)
          }

          resolve({
            status: res.statusCode,
            quota: {
              limit: res.headers['x-ratelimit-limit'],
              remaining: res.headers['x-ratelimit-remaining'],
              reset: res.headers['x-ratelimit-reset']
            },
            data
          })
        })
      }).on('error', reject).end()
    })
  }

  /**
   * Search
   *  - Searches schedules for matches based on free text.
   *
   * @link: https://api.datathistle.com/assets/doc/#api-Search-Search
   *
   * Usage:
    ``` javascript
    const data = await datathistle.search({
      query: 'Abbey Theatre'
    })
    ```
   *
   * @param {Object} params - View link for available query parameters
   * @returns {Promise} - Resolves to object: `{status: 200, quota: {}, result: [{...}, ...]}`
   */
  search(params = {}) {
    //
    return new Promise((resolve, reject) => {
      if (!this.key) {
        return reject(new Error('API key not set.'))
      }

      //
      https.request({
        hostname: this.hostname,
        path: '/' + this.version + '/search?' + querystring.stringify(params),
        port: 443,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + this.key
        }
      }, (res) => {
        //
        let data = ''
        res.on('data', function (chunk) {
          data += chunk
        })

        //
        res.on('end', () => {
          try {
            data = JSON.parse(data)
          } catch (e) {
            const err = new Error(e.message)
            err.status = res.statusCode
            err.quota = {
              limit: res.headers['x-ratelimit-limit'],
              remaining: res.headers['x-ratelimit-remaining'],
              reset: res.headers['x-ratelimit-reset']
            }
            return reject(err)
          }

          resolve({
            status: res.statusCode,
            quota: {
              limit: res.headers['x-ratelimit-limit'],
              remaining: res.headers['x-ratelimit-remaining'],
              reset: res.headers['x-ratelimit-reset']
            },
            data
          })
        })
      }).on('error', reject).end()
    })
  }
}
