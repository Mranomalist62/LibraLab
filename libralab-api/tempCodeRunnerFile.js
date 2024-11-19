
app.use(cors()); 
app.use(bodyParser.json());
app.use('/user', userRoute); // Prefixing all routes with /user

app.listen(3000, () => console.log('Server started on port 3000'));