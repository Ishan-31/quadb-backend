const multer = require('multer')
const Grid = require('gridfs-stream');
const { Mongoose } = require('./config/database');

// Initialize GridFS
Grid.mongo = Mongoose.mongo;
const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
    gfs = Grid(conn.db);
})
// Configure multer for file uploads
const storage = multer.memoryStorage()

const upload = multer({ storage: storage })

module.exports = { upload, gfs }