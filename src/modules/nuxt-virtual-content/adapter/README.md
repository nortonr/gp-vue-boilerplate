# Adapter

## Functions

###  `async` getRoutes

Ruft asynchron alle Routen ab.

**Return** 
```json
[
  {
    "path": "/index",
    "data": {
      "de": {
        "url": {
          "path": "/"
        },
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
        "url": {
          "path": "/"
        },
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
    "path": "/contact",
    "data": {
      "de": {
        "url": {
          "path": "/kontakt"
        },
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
        "url": {
          "path": "/contact"
        },
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
| `path`      | Route Name       |
| `data`      | Sprach-Varianten |



**Einzelne Sprache**

| Eigenschaft  | Beschreibung                                              |
| ------------ | --------------------------------------------------------- |
| `url`        | Routen-Objekt zum abfragen der `localPath` Methode (i18n) |
| `title`      | Seiten Title                                              |
| `components` | Seiten Componenten                                        |

```json
{
  "path": "/contact",
  "data": {
    "de": {
      "url": {
        "path": "/kontakt"
      },
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
      "url": {
        "path": "/contact"
      },
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
