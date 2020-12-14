const express = require('express');
const app = express();

// Setting headers and cors

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
// Server settings (Port, application name, etc)
app.set('port', process.env.PORT || 3000);

// Middlewares (Functions executed before something is processed)
app.use(express.json());

// Routes (Server's URLs to process, receive, send data)
app.use(require('./routes/rol'));
app.use(require('./routes/login'));
app.use(require('./routes/user'));
app.use(require('./routes/aux_medico'));
app.use(require('./routes/medicamento'));
app.use(require('./routes/abuelo_medicamento'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});



