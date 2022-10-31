const { readLocalStorage } = require('..')

async function test () {
  await readLocalStorage('test', 'test.com')
}

test()
