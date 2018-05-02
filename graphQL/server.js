const express = require("express");
const bodyP = require("body-parser");

// esto (graphqlExpress) es un middleware (o funciona como uno)
// esto (graphiqlExpress) es para crear una interfaz de graphiql y poder trabajar con ella
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");

// importando nuetro schema
const schema = require("./schema");

const app = express();

// asi se tendria que pasar, pero como es ecma 2015 y es el mismo nombre de variable...
// app.use('/graphql', bodyP.json(), graphqlExpress({ schema: schema }));

// ...se pasa de esta forma
// el endpoint '/graphql'
app.use(
  "/graphql",
  bodyP.json(),
  graphqlExpress({
    schema,
    // se agrego eso para darle el formato deceado a los errores, a partir de ahora solo sale el mensaje"
    formatError: error => {
      return {
        mensaje: error.message
      };
    }
  })
);

// la opcion (endpointURL) significa, 'dentro de mi mismo dominio, o app y esta en '/graphql' '
// el endpoint '/graphiql'
// el graphiql solo es la interfaz grafica para hacer consultas, puedes hacer consultas en POST
// a graphql con un formato json donde van las querys y todo lo demas
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`
    GraphQL corriendo en http://localhost:${PORT}
    GraphiQL en http://localhost:${PORT}/graphiql
    `);
});