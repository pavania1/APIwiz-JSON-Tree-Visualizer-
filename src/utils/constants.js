export const SAMPLE_JSON = {
  "user": {
    "id": 1,
    "name": "Pavani Adina",
    "email": "adinapavani@gmail.com",
    "address": {
      "street": "Ramalayam",
      "city": "Vishakapatnam",
      "zipcode": "531027"
    },
    
  },
  "items": [
    {
      "id": 101,
      "product": "Laptop",
      "price": 999.99
    },
    {
      "id": 102,
      "product": "Mouse",
      "price": 29.99
    }
  ],

  
  
};

export const NODE_COLORS = {
  object: '#8B5CF6',
  array: '#10B981',
  primitive: '#F59E0B',
  highlight: '#EF4444'
};

export const NODE_BORDER_COLORS = {
  object: '#7C3AED',
  array: '#059669',
  primitive: '#D97706',
  highlight: '#DC2626'
};

export const SEARCH_EXAMPLES = [
  { path: '$.user.name', description: 'Object property' },
  { path: '$.items[0].product', description: 'Array element' },
  { path: '$.user.address.city', description: 'Nested property' }
];