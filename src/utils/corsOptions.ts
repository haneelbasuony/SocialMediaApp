export const corsOptions = {
  origin: process.env.CLIENT_URL || '*', // e.g. http://localhost:3000
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // if you need cookies / auth headers
};
