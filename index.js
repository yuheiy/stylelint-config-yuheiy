const propertiesOrder = require('./properties-order.json')

module.exports = {
  extends: 'stylelint-config-standard',
  plugins: [
    'stylelint-scss',
    'stylelint-order',
  ],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'order/order': [
      'dollar-variables',
      'custom-properties',
      'declarations',
      'at-rules',
      {
        type: 'at-rule',
        name: 'media',
      },
      'rules',
    ],
    'order/properties-order': [
      propertiesOrder,
      {
        'unspecified': 'bottomAlphabetical',
      },
    ],
  },
}
