var sqlite3 = require('sqlite3').verbose( );
var db = new sqlite3.Database('./playlist.db');

	db.run("CREATE TABLE playlist (id INTEGER PRIMARY KEY AUTOINCREMENT , title VARCHAR, video_ID VARCHAR, video_URL VARCHAR, rating INTEGER);");

