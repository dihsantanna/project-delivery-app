const login = require('./routes/login.route');

const port = process.env.PORT || 3001;
const app = require('./app');

app.listen(port);
console.log(`Api rodando na porta ${port}`);

app.use('/login', login);