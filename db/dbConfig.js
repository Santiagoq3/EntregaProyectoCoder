const knex = require("knex")


 const database = knex({
    client: "sqlite3",
    connection: {filename: "./db/products.sqlite"}
})

 const database_mysql = knex({
    client: "mysql",
    version: "10.4.14",
    connection: {
        host: "127.0.0.1",
        port: 3306,
        user: "root",
        password :"",
        database: "coderecommerce"
    },
    pool: {min:0,max:10}
})


 const mongodbConfig = {
    connection : process.env.MONGODB_CNN,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
}


const firebaseConfig = {
    "type": "service_account",
    "project_id": "ecommerce-coderhouse-6fc6b",
    "private_key_id": "9fa1e6b02dfa765ee5307347ba5f48b406e80e7d",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDkrhZphlQKBIid\nHSbQgBLwJljqBj2zWY/J4rKoY4ZUNUpRuZ0u+mCKGoXWodfOakEYLA8nZx7WEyrD\nAfxC3PF3VIEdd3CTemzVD8CaKCqRcoRThcqr3d7s0QG07w5xXg/AL4ItAivPfsj+\n3Twdn+xJ5Vj8ZtQIW1gOoKLPvvldVEaRquD8/smBYLJ96nyRbElVrQQOeY2lvr1b\n1XJgFHb/+4kz0qMjqbjGalK1Q+7mL3V94/oicw+1ayjdLDSo5N0NyJQFzWnY9pGf\nwI6ZU8UsILX6tjCBEjsNDLBxZS+8SiLMR+RtEc+RD9/y0LMKr3Y1aodYZeQkaqbA\nnB8y+/x/AgMBAAECggEAaPF5SJEEJRrChPOZWerEhh/bAv69Nv69bWUTHxKZVTCl\nfA7F0wbE4evdCsv36Pq7B7hEdg0tSgm+wII7PYX+bAhEPn0PFScEJdzWQwh2zIu0\nrU3DXg7yXFRoR5vDUYRcjxJeV4BdEZp56/gkO+Ylvh25sg8QdAtTRFc0kEjwUALc\nHdtFxOUvumKk3fDeV0U2GYVK5p7fR4IZxJq95knKM/BwUD1mmvHosthXOMmfc/OX\nmHxik15ZiuMaPJNLcD48f9qCXPmj3NY1gKSUAEutMqRIZEZT92KiHpUPmtEgbSDo\ngcl5yoF2VzYPTjQ32+OLNoviFArhXKdzzijU/eryIQKBgQD8oqjsxoH0VeZrDQAA\nubxhuHk4dcaYJjCqJC3Hx5mIBcXMXPqDtgJdwXiFrUdnzWnaAKtepYkOtI0tdfRE\nyFSBOf031pnAZAomfoQ6ZN+0rUJHkR/t6kkU5DAkXP/mgXPqKMXjqKhaIZRxuT4d\nyjoZRnFd678lk61uVvpy0OnbnwKBgQDnucD5E3Lfac6loQCCm7qRKBeUN/4vELoG\nIxk9pJUhBW6BdWgT2WSkaCegGq8l7JT5YzwC+T5zi9GOz5u7BayiGdSPQ7YTBqJR\nw/3Bsu4sEB3FvFRSDr5GaeZFPG8HtiMzqoR84SvqJ1GqrskhjX8PvPpOPBzOME8s\nqTXImiozIQKBgQD4IA4HV0QlpQSE2aTKEaIq3BL61/nwT3n2cUghcjGhvgGyIRPO\nrsGOMcnciP6bvc0b1xJ5B94f+ka6gqIhuBv/O+QupnAl3Ft3yUS3UYHBo3V4ctnI\nQxX6FdAOtuSDEVu2fMs3ONv4ggiY1VZjzc3YKy6HD1aSYoOw3m5mvDcjgwKBgQCM\naeKlC0PwXQz7EDRe8D589u5SwhskKd6PGXWSBMjY2ZG8oIgQfwqdFP/t5D19nX4o\nIBmdM6rEGVVCVErpaObS0xQaO814eeyh30FEvkfUK2/fAd+WWZiy0jjWe2hMI/Hw\nvMLLaSZTHMA/zOnTiwoTX0/NWF+cEWnohiAxDjnEAQKBgEe+w2nTLqAdWgu55szS\nFWupIzUCdepz5dEpMu0zGfCUasfTnW4ejB8WiqJ4p1nUsD62lfzNNa0JnQs1/6kR\nXHQqFsBpLaAHNJrgH7Vug3DVjINjiPxrE5BxCXp+ierCn70B/t4fLA5tX0H720S3\nPADUqtTpn3WAMxXq4j1YMpYL\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-43vl1@ecommerce-coderhouse-6fc6b.iam.gserviceaccount.com",
    "client_id": "112168871324193061520",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-43vl1%40ecommerce-coderhouse-6fc6b.iam.gserviceaccount.com"
  }

module.exports = {
    database,
    database_mysql,
    mongodbConfig,
    firebaseConfig
}

