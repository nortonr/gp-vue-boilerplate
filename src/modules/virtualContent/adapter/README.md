# Adapter

## Functions

###  `async` getRoutes

Ruft asynchron alle Routen ab.

**Return** 
```json
[
  {
    "de": {
      "url": "/blaupause",
      "title": "Blaupause",
      "components": [
        {
          "component": "",
          "data": {}
        }
      ]
    },
    "en": {
      "url": "/blueprint",
      "title": "Blueprint",
      "components": [
        {
          "component": "",
          "data": {}
        }
      ]
    }
  }
]
```


## Route

Eine Route kann aus verschiedenen Sprachen bestehen.

Für jede Sprache müssen folgende Eigenschaften vorhanden sein.

| Eigenschaft  | Beschreibung       |
| ------------ | ------------------ |
| `url`        | Seiten Url         |
| `title`      | Seiten Title       |
| `components` | Seiten Componenten |

```json
{
  "de": {
    "url": "/blaupause",
    "title": "Blaupause",
    "components": [
      {
        "component": "",
        "data": {}
      }
    ]
  },
  "en": {
    "url": "/blueprint",
    "title": "Blueprint",
    "components": [
      {
        "component": "",
        "data": {}
      }
    ]
  }
}
```
