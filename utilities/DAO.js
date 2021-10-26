import {consistencia} from "../globals/globales.js";
import DATABASES from "../utilities/constistenicas.js";

class Factory{

    constructor(){
        this.aplicarDatabase();
    }

    aplicarDatabase(){
        switch(consistencia){
            case 1:
                const MARIADB = new DATABASES.MariaDB();
                return MARIADB;
                break;
            case 2:
                const SQLITE3 = new DATABASES.SQLite3DB();
                return SQLITE3;
                break;
            case 3:
                const MONGODB = new DATABASES.MongoDB();
                return MONGODB;
                break;
            case 4:
                const FIREBASE = new DATABASES.FirebaseDB();
                return FIREBASE;
                break;
        }
    }
}

export default Factory;
