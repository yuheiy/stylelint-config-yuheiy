const fs = require('fs')
const https = require('https')
const yaml = require('js-yaml')

https
  .get('https://raw.githubusercontent.com/twbs/bootstrap/v4-dev/.scss-lint.yml', (res) => {
    if (res.statusCode !== 200) {
      res.resume()
      throw new Error(`Request Failed.\nStatus Code: ${res.statusCode}`)
    }

    res.setEncoding('utf8')
    let rawData = ''
    res.on('data', (chunk) => { rawData += chunk })
    res.on('end', () => {
      const { linters: { PropertySortOrder: { order } } } = yaml.safeLoad(rawData)
      const orderedUnPrefixedProps = order.filter((prop) => !prop.startsWith('-'))
      fs.writeFileSync('properties-order.json', JSON.stringify(orderedUnPrefixedProps))
    })
  })
  .on('error', (err) => {
    throw err
  })
