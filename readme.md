# Kirby KQL Nuxt plugin

This plugin allows ease of access to all of your Kirby pages on sites that use the KQL plugin

## Installation

### npm

```
npm i nuxt-kirby-kql
```

### yarn

```
yarn add nuxt-kirby-kql
```

## Configuration

nuxt.conf

```js
publicRuntimeConfig: {
  kirby: {
    url: process.env.KIRBY_SITE || 'XXX',
    username: process.env.KIRBY_USERNAME || 'XXX',
    password: process.env.KIRBY_PASSWORD || 'XXX'
  }
},
plugins: [
  './node_modules/nuxt-kirby-kql'
],
```

## Usage

The plugin exposes globally `$kirby` on the components `this`

To make a KQL request, simply call the `find()` method passing the KQL request.

Reponse includes

| Property      | Type | Description     |
| :---        |    :----   | :---          |
| ok      | Boolean       | If the request was successful or not   |
| status   | Number        | HTTP response code     |
| statusText   | Strong        | HTTP status text     |
| json   | String        | Reponse payload     |

### Example

```js
const { json: page } = await this.$kirby.find({
    "query": "page('photography').children",
    "select": {
        "url": true,
        "title": true,
        "text": "page.text.markdown",
        "images": {
            "query": "page.images",
            "select": {
                "url": true
            }
        }
    },
    "pagination": {
        "limit": 10
    }
})
return { page }

```

## Licence 

MIT

## Support Me! :)

I release stuff for free, feel free to use this however you wish, if you like it, I am a coffee addict, help me pay for more coffee
https://www.buymeacoffee.com/danielrivers

## Credits

Thanks to
- @HashandSalt for being first user and tester
- The whole @getkirby team