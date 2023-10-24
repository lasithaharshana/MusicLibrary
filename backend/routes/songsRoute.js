import express from 'express';
import { Song } from '../models/songModel.js';
import { Playlist } from '../models/playlistModel.js';
const router = express.Router();

// Route for Save a new song
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.artist ||
      !request.body.album ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, artist,album, publishYear',
      });
    }
    const newSong = {
      title: request.body.title,
      artist: request.body.artist,
      album: request.body.album,
      publishYear: request.body.publishYear,
    };

    const song = await Song.create(newSong);

    return response.status(201).send(song);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All songs from database
router.get('/', async (request, response) => {
  try {
    const songs = await Song.find({});

    return response.status(200).json({
      count: songs.length,
      data: songs,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One song from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const song = await Song.findById(id);

    return response.status(200).json(song);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a song
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.artist ||
      !request.body.album ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, artist,album, publishYear',
      });
    }

    const { id } = request.params;

    const result = await Song.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'song not found' });
    }

    return response.status(200).send({ message: 'song updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a song
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    // First, remove the song ID from all playlists
    await Playlist.updateMany({}, { $pull: { songs: id } });

    // Then, delete the song
    const result = await Song.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Song not found' });
    }

    return response.status(200).send({ message: 'Song deleted successfully' });
  } catch (error) {
    console.error(error);
    response.status(500).send({ message: 'Internal Server Error' });
  }
});

export default router;
