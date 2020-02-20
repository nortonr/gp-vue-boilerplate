export default {
  model: {
    name: 'first',
    value: 'b'
  },
  options: [
    {
      label: 'Option A',
      value: 'a',
      child: {
        model: {
          name: 'second',
          value: 'a3'
        },
        options: [
          { label: 'Option A1', value: 'a1' },
          { label: 'Option A2', value: 'a2' },
          { label: 'Option A3', value: 'a3' }
        ]
      },
      inputs: [
        'text', 'number', 'date'
      ]
    },
    {
      label: 'Option B',
      value: 'b',
      child: {
        model: {
          name: 'second',
          value: 'b2'
        },
        options: [
          {
            label: 'Option B1',
            value: 'b1',
            child: {
              model: {
                name: 'third',
                value: 'b1_b'
              },
              options: [
                {
                  label: 'Option B1 a',
                  value: 'b1_a',
                  inputs: [
                    'number', 'number', 'number'
                  ]
                },
                {
                  label: 'Option B1 b',
                  value: 'b1_b',
                  inputs: [
                    'text', 'text', 'text'
                  ]
                },
                {
                  label: 'Option B1 c',
                  value: 'b1_c',
                  inputs: [
                    'date', 'date', 'date'
                  ]
                }
              ]
            }
          },
          {
            label: 'Option B2',
            value: 'b2',
            child: {
              model: {
                name: 'third',
                value: 'b2_b'
              },
              options: [
                { label: 'Option B2 a', value: 'b2_a' },
                { label: 'Option B2 b', value: 'b2_b' },
                { label: 'Option B2 c', value: 'b2_c' }
              ]
            }
          },
          {
            label: 'Option B3',
            value: 'b3'
          }
        ]
      },
      inputs: [
        'text', 'number', 'date'
      ]
    },
    {
      label: 'Option C',
      value: 'c',
      child: {
        model: {
          name: 'second',
          value: 'c2'
        },
        options: [
          { label: 'Option C1', value: 'c1' },
          { label: 'Option C2', value: 'c2' },
          { label: 'Option C3', value: 'c3' }
        ]
      },
      inputs: [
        'text', 'number', 'date'
      ]
    },
    {
      label: 'Option D',
      value: 'd',
      inputs: [
        'text', 'number', 'date'
      ]
    }
  ]
};
