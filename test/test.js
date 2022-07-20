process.env.DEBUG = 'node-datathistle:*'
process.env.DATATHISTLE_API_KEY = '<ENTER API KEY HERE>'

require('assert')
require('should')

//
const datathistle = new (require('../src/index.js'))()

//
const delay = interval => {
  return it('💕 sleeping for ' + interval / 1000 + 's', done => {
    setTimeout(done, interval)
  }).timeout(interval + 100)
}

/**
 * Tests
 */
describe('node-datathistle', function () {
  /**
   * Lib basics
   */
  describe('library', function () {
    //
    it('should have "key" property', () => {
      datathistle.should.have.property('key')
    })

    //
    it('should have "version" property', () => {
      datathistle.should.have.property('version')
    })

    //
    it('should have "hostname" property', () => {
      datathistle.should.have.property('hostname')
    })

    delay(1000)
  })

  /**
   * Events
   */
  describe('events()', function () {
    //
    it('should return result, expecting status 200', async () => {
      const result = await datathistle.events({
        place_id: 'f654b851-1ef1-605a-1feb-1e450000fa37'
      })
      result.should.have.property('status', 200)
      result.should.have.property('quota')
      result.should.have.property('data')
    })

    delay(1000)

    //
    it('should return result, expecting status 200', async () => {
      const result = await datathistle.events({
        id: '565057e7-3044-ce31-da9f-8b26001d0d32'
      })
      result.should.have.property('status', 200)
      result.should.have.property('quota')
      result.should.have.property('data')
    })

    delay(1000)
  })

  /**
   * Places
   */
  describe('places()', function () {
    //
    it('should return result, expecting status 200', async () => {
      const result = await datathistle.places({
        name: 'Abbey Theatre'
      })
      result.should.have.property('status', 200)
      result.should.have.property('quota')
      result.should.have.property('data')
    })

    delay(1000)

    //
    it('should return result, expecting status 200', async () => {
      const result = await datathistle.places({
        id: 'f654b851-1ef1-605a-1feb-1e450000fa37'
      })
      result.should.have.property('status', 200)
      result.should.have.property('quota')
      result.should.have.property('data')
    })

    delay(1000)
  })

  /**
   * Search
   */
  describe('search()', function () {
    //
    it('should return result, expecting status 200', async () => {
      const result = await datathistle.search({
        query: 'Abbey Theatre'
      })
      result.should.have.property('status', 200)
      result.should.have.property('quota')
      result.should.have.property('data')
    })

    delay(1000)
  })
})
