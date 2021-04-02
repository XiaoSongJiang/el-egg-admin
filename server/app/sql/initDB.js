const fs = require('fs');
const path = require('path');
const DB = 'ele_admin_server';
const initSql = path.join(__dirname, 'ele-admin-server.sql');

const config = require(path.resolve(__dirname, '../../config/config.local.js'))();
const { username, password } = config.sequelize;
(async () => {
    const { Client } = require('pg');
    const client = new Client({
        user: username,
        password,
    })
    await client.connect()
    let sql = `SELECT u.datname  FROM pg_catalog.pg_database u where u.datname='${DB}';`
    const res = await client.query(sql)
    if (!res.rowCount) {
        console.log("数据库不存在");
        sql = `create database ${DB}`;
        await client.query(sql);
    } else {
        console.log("数据已存在");
        return;
    }
    await client.end();
    const client1 = new Client({
        user: username,
        password,
        database: DB
    });
    await client1.connect();
    sql = fs.readFileSync(initSql, { encoding: 'utf8' });
    await client1.query(sql);
    await client1.end();
})()
