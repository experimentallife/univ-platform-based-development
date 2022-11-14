# Graphql

GraphQL es un lenguaje de consulta para API y un tiempo de ejecución para cumplir con esas consultas con sus datos existentes. GraphQL brinda una descripción completa y comprensible de los datos en su API, brinda a los clientes el poder de solicitar exactamente lo que necesitan y nada más, facilita la evolución de las API con el tiempo y habilita herramientas poderosas para desarrolladores.

**Request**
```gql
{
  hero {
    name
    height
    mass
  }
}
```

**Response**
```json
{
  "hero": {
    "name": "Luke Skywalker",
    "height": 1.72,
    "mass": 77
  }
}
```

## Conceptos

### Schemas
Los componentes más básicos de un esquema de GraphQL son los tipos de objetos, que solo representan un tipo de objeto que puede obtener de su servicio y qué campos tiene. En el lenguaje de esquema GraphQL, podríamos representarlo así:

```
type Character {
  name: String!
  appearsIn: [Episode!]!
}
```

El lenguaje es bastante legible, pero repasémoslo para que podamos tener un vocabulario compartido:

<kbd>Character</kbd> es un tipo de objeto de GraphQL, lo que significa que es un tipo con algunos campos. La mayoría de los tipos en su esquema serán tipos de objetos.

 <kbd>name</kbd> y <kbd>appearsIn</kbd> son campos en el tipo de <kbd>Character</kbd>. Eso significa que el nombre y aparece en son los únicos campos que pueden aparecer en cualquier parte de una consulta de GraphQL que opera en el tipo de <kbd>Character</kbd>.

<kbd>String</kbd> es uno de los tipos escalares incorporados: estos son tipos que se resuelven en un solo objeto escalar y no pueden tener subselecciones en la consulta. Repasaremos los tipos escalares más adelante.

<kbd>String!</kbd> significa que el campo no admite valores NULL, lo que significa que el servicio GraphQL promete proporcionarle siempre un valor cuando consulta este campo. En el lenguaje tipográfico, representaremos aquellos con un signo de exclamación.

<kbd>[¡Episodio!]!</kbd> representa una matriz de objetos <kbd>Episode</kbd>. Dado que tampoco acepta valores NULL, siempre puede esperar una matriz (con cero o más elementos) cuando consulta el campo <kbd>appearsIn</kbd>. Y desde <kbd>Episode!</kbd> tampoco acepta valores NULL, siempre puede esperar que cada elemento de la matriz sea un objeto <kbd>Episode</kbd>.

### Queries
En su forma más simple, GraphQL se trata de solicitar campos específicos en objetos. Comencemos mirando una consulta muy simple y el resultado que obtenemos cuando la ejecutamos:

**Request**
```
{
  hero {
    name
  }
}
```
**Response**
```json
{
  "data": {
    "hero": {
      "name": "R2-D2"
    }
  }
}
```
### Resolvers

Resolver es una colección de funciones que generan una respuesta para una consulta de GraphQL. En términos simples, un resolver actúa como un controlador de consultas de GraphQL. Cada función de resolución en un esquema GraphQL acepta cuatro argumentos posicionales como se indica a continuación:

```ts
fieldName:(root, args, context, info) => { result }
```

A continuación se muestra un ejemplo de funciones de resolución:

```ts
greeting:() => {
   return "hello world!"
}
```

## Graphql Vs REST API

| GRAPHQL  | REST API  |
|---|---|
| Un lenguaje de consulta para resolver problemas comunes al integrar API  | Un estilo arquitectónico visto en gran medida como un estándar convencional para el diseño de API.  |
| Implementado a través de HTTP utilizando un único punto final que proporciona todas las capacidades del servicio expuesto | Implementado sobre un conjunto de URL donde cada uno de ellos expone un solo recurso  |
| Utiliza una arquitectura impulsada por el cliente  | Utiliza una arquitectura basada en servidor |
| Carece de mecanismo de almacenamiento en caché incorporado | Utiliza el almacenamiento en caché automáticamente |
| No se requiere versión de API | Soporta múltiples versiones de API |
| Salida de respuesta en JSON | Salida de respuesta generalmente en XML, JSON y YAML |
| Ofrece seguridad de tipo y documentación generada automáticamente | No ofrece seguridad de tipo o documentación generada automáticamente |
| Permite la unión de esquemas y la obtención remota de datos | Simplificar el trabajo con múltiples puntos finales requiere un costoso middleware personalizado |
