export default function ({
    $config
  }, inject) {
    const config = $config.kirby
    inject('kirby', {
      find
    })
  
    const headers = {
      Authorization: 'Basic ' + Buffer.from(config.username + ':' + config.password).toString('base64'),
      'Content-Type': 'application/json'
    }
  
    async function find ({
      request
    }) {
      try {
        return unWrap(await fetch(`${config.url}/api/query`, {
          headers,
          method: 'POST',
          body: JSON.stringify(request),
          mode: 'cors'
        }))
      } catch (error) {
        return getErrorResponse(error)
      }
    }
  
    async function unWrap (response) {
      const jsonResponse = await response.json()
      const {
        ok,
        status,
        statusText
      } = response
      return {
        json: jsonResponse.result,
        ok,
        status,
        statusText
      }
    }
  
    function getErrorResponse (error) {
      return {
        ok: false,
        status: 500,
        statusText: error.message,
        json: {}
      }
    }
  }