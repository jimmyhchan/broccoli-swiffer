module.exports = [
  {
    name: 'no if',
    description: 'no if allowed',
    target: {
      type: '@',
      matches: 'if'
    }
  },
  {
    name: 'no and',
    description: 'no and allowed',
    target: {
      type: '@',
      matches: 'and'
    }
  }
];
