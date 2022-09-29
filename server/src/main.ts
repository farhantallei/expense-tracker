import app, { addPlugins, addRoutes } from './app';

addPlugins();
addRoutes();

app.listen({ port: 1000 }, (err, address) => {
  if (err) {
    console.error(err.message);
    return process.exit(1);
  }
  console.log(
    `\x1b[1m\x1b[33m[fastify] \x1b[0mServer is running at \x1b[1m\x1b[34m${address}\x1b[0m`
  );
});
