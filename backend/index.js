const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');



require('./utils/importDB');
const cache = require('./utils/cache');

//import des routes
const UserRoutes = require('./src/routers/user.router');
const AuthRoutes = require('./src/routers/auth.router');

const AchatRoutes = require('./src/routers/achat.router');
const ActiviteRoutes = require('./src/routers/activite.router');
const InfoPrestataireRoutes = require('./src/routers/infoPrestataire.router');
const StandRoutes = require('./src/routers/stand.router');
const TarifRoutes = require('./src/routers/tarif.router');
const TypeActiviteRoutes = require('./src/routers/typeActivite.router');
const LivreDOrRoutes = require('./src/routers/livre-d-or.router');
const ServicesRoutes = require('./src/routers/services.router');
const MessageRoutes = require('./src/routers/message.router');


const MessageController = require('./src/controllers/message.controller');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


//--------Application

//Création de l'application
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));



//cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Utilise le cache pour les routes
app.use(cache(300));

//logger des requêtes
app.use((req, res, next) => {
    console.log('#######')
    console.log('Requête reçue à ' + new Date().toLocaleString() + ' : ' + req.method + ' ' + req.url + ' ' + JSON.stringify(req.body));
    console.log('Authorization : ' + req.headers.authorization);
    next();
});


/** Swagger Initialization - START */
const swaggerOption = {
    swaggerDefinition: (swaggerJsDoc.Options = {
        info: {
            title: "LCMDMA app",
            description: "Documentation de l'API LCMDMA. Pour toutes les requêtes avec un cadenas sur la droite," +
                " il faut un token valide pour se connecter, vous pouvez vous connecter avec le compte admin dans la catégorie" +
                " Login, avec le login : thomas et le mot de passe : testtest. Il faut ensuite récupérer le token et le mettre dans" +
                " l'onglet Authorize de Swagger, en mettant Bearer devant le token. Pour les requêtes sans cadenas, vous pouvez" +
                " les tester sans vous connecter.",
            contact: {
                name: "Raphael",
            },
            servers: ["http://localhost:3000/"],
        },
        schemes: {
            http: "http",
            https: "https",
        },
        securityDefinitions: {
            "Bearer": {
                type: "apiKey",
                scheme: "bearer",
                name: "Authorization",
                in: "header",
                description: "Bearer {token}",
            }
        },
        //security : [ { Bearer: [] } ],
    }),
    apis: ["index.js", "./src/routers/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOption);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
//définition du dossier des images en static
const imgFolder = path.join(__dirname, 'images_presta')
app.use('/frontend/public/', express.static(imgFolder));
//mise en place des routes
app.use('/api/auth', AuthRoutes);
app.use('/api/users', UserRoutes);

app.use('/api/achats', AchatRoutes);
app.use('/api/activites', ActiviteRoutes);
app.use('/api/infoPrestataires', InfoPrestataireRoutes);
app.use('/api/stands', StandRoutes);
app.use('/api/tarifs', TarifRoutes);
app.use('/api/typeActivites', TypeActiviteRoutes);
app.use('/api/livre-d-or', LivreDOrRoutes);
app.use('/api/services', ServicesRoutes);
app.use('/api/messages', MessageRoutes);


//ajout des socket d'envoie et de reception de message

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});



//cors pour les sockets




io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('message', (msg) => {
        //ajoute le message a la base de donnée
        MessageController.createMessageFromSocket(msg)
            .then((message) => {
                //envoie le message a tous les utilisateurs
                io.emit('message', message);
            })
            .catch((err) => {
                console.log(err);
            });

    });
});




//lancement de l'application
http.listen(port,()=>{
    console.log("http://localhost:"+port);
});