const retry = require('async-retry');
const axios = require('axios');

(async () => {

  const res = await get('http://localhost:3000')
  console.log(res)

  async function get(uri) {
    return await retry(async bail => {
      const res = await axios.get(uri)
      console.log(`response: ${res.data}`)
      return res
    }, {
        retries: 2,
        minTimeout: 2000,
        factor: 3,
        onRetry: (err, num) => {
          console.log(`retry count: ${num}`)
        }
      })
  }
})();