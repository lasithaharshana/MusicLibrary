import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import songsRoute from './routes/songsRoute.js';
import playlistsRoute from './routes/playlistsRoute.js';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import cors from 'cors';



const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To Music Library');
});

app.use('/songs', songsRoute);
app.use('/playlists', playlistsRoute);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
