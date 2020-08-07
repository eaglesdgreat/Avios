module.exports = config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8020,
    mongoUri: process.env.MONGO_URI || (process.env.HOST || 'mongodb://') + (process.env.IP || 'localhost') + ':'
      + (process.env.Port || '27017') + '/avios',
    options: {
      useCreateIndex: true, 
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  }