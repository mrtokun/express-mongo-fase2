import mongoose from "mongoose"

// mongoose.connect("mongodb+srv://alura:123@alura.dkjed.mongodb.net/alura-node");
    //Utiliza-se a lib dotenv para mover a string de conexão para o arquivo .env e evitar de salva-la no github
    // mongoose.connect(process.env.DB_CONNECTION_STRING);

// let db = mongoose.connection;

async function db() {
    mongoose.connect(process.env.DB_CONNECTION_STRING);
    // mongoose.connect('mongodb+srv://admin:admin123@cluster0.vrimdxl.mongodb.net/livraria?appName=Cluster0');

    return mongoose.connection;
}

export default db;