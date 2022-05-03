const login = require('./routes/login.route');
const register = require('./routes/register.route');

const port = process.env.PORT || 3001;
const app = require('./app');

app.listen(port);
console.log(`Api rodando na porta ${port}`);

app.use('/login', login);
app.use('/register', register);