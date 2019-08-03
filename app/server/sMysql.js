"use strict"

const mysql = require("mysql");
const connection =  mysql.createPool({
	host			:	"localhost",       
	user			: 	"root",
	password		: 	"nitram77340",
	database		:	"devoxy",
});

connection.getConnection(function(e) {
	if (e) 	{
		console.log("DATABASE IS NOT WORKING");
		throw e;
	}
	else 	{
		console.log(`DATABASE IS WORKING`);
	}
});

module.exports = connection;