# Adapter

- [Adapter](#adapter)
  - [Constants](#constants)
    - [PATH](#path)
  - [Functions](#functions)
    - [getRoutes](#getroutes)
    - [getRoute](#getroute)
    - [getLayout](#getlayout)
  - [Route](#route)

## Constants

### PATH

Type: `String`

Default: `__dirname`

**Muss gesetzt sein (required)**

Die `PATH` Konstante muss definiert sein. Wird benötigt für den Aufruf des Adapters über die Plugins.

```javascript
export const PATH = __dirname;
```


## Functions

### getRoutes

Ruft `asynchron` alle Routen ab.

**Arguments:**

| Name           | Type            | Bschreibung                                   |
| -------------- | --------------- | --------------------------------------------- |
| locales        | `Array<String>` | Verwendete Sprachen Bsp.: ['de', 'en', …]     |
| adapterOptions | `Object`        | Über `nuxt-config` definierte Adapter-Options |

**Return:**

```json
[
  {
    "path": "/index",
    "data" : {
      "de": {…},
      "en" : {…}
    }
  },
  …
]
```


### getRoute

Ruft `asynchron` eine einzelne Route ab.

- Im `development`-Mod aktiv.

**Arguments:**

| Name           | Type            | Bschreibung                               |
| -------------- | --------------- | ----------------------------------------- |
| route          | `Object`        | Vue-Router Route                          |
| path           | `String`        | Router Path without locale prefix (`/en`) |
| defaultLocale  | `String`        | Default locale (`de`)                     |
| locale         | `String`        | Current locale (`de`)                     |
| locales        | `Array<String>` | Verwendete Sprachen Bsp.: ['de', 'en', …] |
| adapterOptions | `Object`        | Adapter-Options from `nuxt-config`        |


**Return:**

```json
{
  "path": "/index",
  "data" : {
    "de": {…},
    "en" : {…}
  }
}
```

### getLayout

Ruft `asynchron` die Layout-Daten ab.

- Wird im `nuxtServerInit` des Stores verwendet um beim Rendervorgang initial Layout spezifische Daten zu laden. (Beispiel: Header, Footer or Cookie-Notification)

**Arguments:**

| Name           | Type            | Bschreibung                               |
| -------------- | --------------- | ----------------------------------------- |
| route          | `Object`        | Vue-Router Route                          |
| path           | `String`        | Router Path without locale prefix (`/en`) |
| defaultLocale  | `String`        | Default locale (`de`)                     |
| locale         | `String`        | Current locale (`de`)                     |
| locales        | `Array<String>` | Verwendete Sprachen Bsp.: ['de', 'en', …] |
| adapterOptions | `Object`        | Adapter-Options from `nuxt-config`        |

**Return:**

```json
{
    "de": {…},
    "en" : {…}
}
```

---

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
