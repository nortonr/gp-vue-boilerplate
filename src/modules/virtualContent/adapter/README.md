# Adapter

## Functions

###  `async` getRoutes

Ruft asynchron alle Routen ab.

**Return** 
```json
[
  {
    "path": "index",
    "data": {
      "de": {
        "url": "/",
        "title": "Startseite",
        "components": [
          {
            "component": "...",
            "data": { ... }
          },
          ...
        ]
      },
      "en": {
        "url": "/",
        "title": "Home",
        "components": [
          {
            "component": "",
            "data": { ... }
          },
          ...
        ]
      }
    }
  },
  {
    "path": "contact",
    "data": {
      "de": {
        "url": "/kontakt",
        "title": "Kontakt",
        "components": [
          {
            "component": "",
            "data": { ... }
          },
          ...
        ]
      },
      "en": {
        "url": "/contact",
        "title": "Contact",
        "components": [
          {
            "component": "",
            "data": { ... }
          },
          ...
        ]
      }
    }
  }
]
```


## Route

Eine Route kann aus verschiedenen Sprachen bestehen.

Für jede Sprache müssen folgende Eigenschaften vorhanden sein.


**Gesamt Route**

| Eigenschaft | Beschreibung     |
| ----------- | ---------------- |
| `path`      | Route Path       |
| `data`      | Sprach-Varianten |



**Einzelne Sprache**

| Eigenschaft  | Beschreibung       |
| ------------ | ------------------ |
| `url`        | Seiten Url         |
| `title`      | Seiten Title       |
| `components` | Seiten Componenten |

```json
{
  "path": "contact",
  "data": {
    "de": {
      "url": "/kontakt",
      "title": "Kontakt",
      "components": [
        {
          "component": "",
          "data": { ... }
        },
        ...
      ]
    },
    "en": {
      "url": "/contact",
      "title": "Contact",
      "components": [
        {
          "component": "",
          "data": { ... }
        },
        ...
      ]
    }
  }
}
```
