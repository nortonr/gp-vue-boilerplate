export default {
  legend: {
    inputs: [
      {
        component: () => import('@/components/atoms/inputs/Numeric'),
        model: {
          name: 'price_min',
          type: Number,
          value: 0
        },
        options: {
          precision: 2,
          formatStyle: 'decimal',
          unit: '€'
        }
      },
      {
        component: () => import('@/components/atoms/inputs/Numeric'),
        model: {
          name: 'price_max',
          type: Number,
          value: 0
        },
        options: {
          precision: 2,
          formatStyle: 'decimal',
          unit: '€'
        }
      },
      {
        component: () => import('@/components/atoms/inputs/Numeric'),
        model: {
          name: 'squaremeter_min',
          type: Number,
          value: 0
        },
        options: {
          precision: 0,
          formatStyle: 'decimal',
          unit: 'm²'
        }
      },
      {
        component: () => import('@/components/atoms/inputs/Numeric'),
        model: {
          name: 'squaremeter_max',
          type: Number,
          value: 0
        },
        options: {
          precision: 0,
          formatStyle: 'decimal',
          unit: 'm²'
        }
      }
    ],
    criteria: []
  },
  matrix: {
    model: {
      name: 'first',
      value: 'b'
    },
    options: [
      {
        label: 'Option A',
        value: 'a',
        matrix: {
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
          'price_min', 'price_max', 'squaremeter_min', 'squaremeter_max'
        ]
      },
      {
        label: 'Option B',
        value: 'b',
        matrix: {
          model: {
            name: 'second',
            value: 'b2'
          },
          options: [
            {
              label: 'Option B1',
              value: 'b1',
              matrix: {
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
              matrix: {
                model: {
                  name: 'third',
                  value: 'b2_b'
                },
                options: [
                  { label: 'Option B2 a', value: 'b2_a' },
                  { label: 'Option B2 b', value: 'b2_b' },
                  { label: 'Option B2 c', value: 'b2_c' }
                ]
              },
              inputs: [
                'color', 'email'
              ]
            },
            {
              label: 'Option B3',
              value: 'b3'
            }
          ]
        },
        inputs: [
          'price_min', 'price_max', 'squaremeter_min', 'squaremeter_max'
        ]
      },
      {
        label: 'Option C',
        value: 'c',
        matrix: {
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
          'price_min', 'price_max', 'squaremeter_min', 'squaremeter_max'
        ]
      },
      {
        label: 'Option D',
        value: 'd',
        inputs: [
          'price_min', 'price_max', 'squaremeter_min', 'squaremeter_max'
        ]
      }
    ]
  }
};
