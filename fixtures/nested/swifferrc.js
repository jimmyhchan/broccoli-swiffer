module.exports = [
  {
    name: 'no {baz}',
    description: 'no {baz} allowed',
    target: {
      type: 'reference',
      matches: 'baz'
    }
  }
];
