const maria_cfg = {
    client : "mysql",
    connection : {
        host : "127.0.0.1",
        user : "root",
        password : "",
        database : "ecommerce"
    }
};

const sqlite_cfg = {
    client : "sqlite3",
    connection : {
        filename : "../database/db.sqlite"
    },
    useNullAsDefault: true

};

export default {
    maria_cfg,
    sqlite_cfg
};
