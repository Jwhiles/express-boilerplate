const test = require('tape');
const request = require('supertest');
const server = require('../src/server.js');

module.exports = () => {
  test(`Server starts without error`, (t) => {
    t.plan(1)
    const testServer = server.listen((err) => {
      if (err) { t.fail('server threw an error', err)
        } else {
      t.pass('server started sucessfully');
      testServer.close();
      }
    });
  });

  test(`Server responds to get '/' with status code 200`, (t) => {
    t.plan(1)
    request(server)
      .get('/')
      .expect(200)
      .end((err) => {
        if (err) {
          t.error(err)
        } else {
          t.pass(`server responded with 200`)
        }
      })
  })

  test(`Server responds sucessfully to static file requests`, (t) => {
    t.plan(2)
    request(server)
      .get('/static.html')
      .expect(200)
      .end((err) => {
        if (err) {
          t.error(err)
        } else {
          t.pass(`server responded with 200`);
        }
      });

    request(server)
      .get('/static.html')
      .expect('Content-Type', /html/)
      .end((err) => {
        if (err) {
          t.error(err)
        } else {
          t.pass(`server responded with 200`);
        }
      });
  })
}
