import express from 'express';
import { Playlist } from '../models/playlistModel.js';
import { Song } from '../models/songModel.js';

const router = express.Router();



// Route for Add a song to a specific playlist
router.post('/:playlistId/add-song', async (request, response) => {
  try {
    const { playlistId } = request.params;
    const { songId } = request.body;

    
    const playlist = await Playlist.findById(playlistId);
    const song = await Song.findById(songId);
    if (playlist && song) {
      const isSongInPlaylist = playlist.songs.some((s) => s.toString() === songId);
      if (isSongInPlaylist) {
        return response.status(400).send({ message: 'Song is already in this playlist' });
      } else {
        playlist.songs.push(song);
        await playlist.save();
        return response.status(201).send(playlist);
      }
    } else {
      return response.status(404).send({ message: 'Playlist or song not found' });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


// Route for Delete a song from a specific playlist
router.delete('/:playlistId/delete-song/:songId', async (request, response) => {
  try {
    const { playlistId, songId } = request.params;
    const playlist = await Playlist.findById(playlistId);

    
    if (playlist) {
      const songIndex = playlist.songs.findIndex((song) => String(song) === songId);
      if (songIndex !== -1) {
        
        playlist.songs.splice(songIndex, 1);
        await playlist.save();
        return response.status(200).send(playlist);
      } else {
        return response.status(400).send({ message: 'Song does not exist in this playlist' });
      }
    } else {
      return response.status(404).send({ message: 'Playlist not found' });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Show songs in a specific playlist
router.get('/:playlistId/songs', async (request, response) => {
  try {
    const { playlistId } = request.params;
    const playlist = await Playlist.findById(playlistId).populate('songs');

    if (playlist) {
      return response.status(200).json({
        count: playlist.songs.length,
        data: playlist.songs,
      });
    } else {
      return response.status(404).send({ message: 'Playlist not found' });
    }
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});











// Route for Save a new Playlist
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.category
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, artist,album, publishYear',
      });
    }
    const newPlaylist = {
      category: request.body.category,
    };

    const playlist = await Playlist.create(newPlaylist);

    return response.status(201).send(playlist);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Playlists from database
router.get('/', async (request, response) => {
  try {
    const playlists = await Playlist.find({});

    return response.status(200).json({
      count: playlists.length,
      data: playlists,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Playlist from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const playlist = await Playlist.findById(id);

    return response.status(200).json(playlist);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Playlist
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.category 
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, artist,album, publishYear',
      });
    }

    const { id } = request.params;

    const result = await Playlist.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Playlist not found' });
    }

    return response.status(200).send({ message: 'Playlist updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a Playlist
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Playlist.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Playlist not found' });
    }

    return response.status(200).send({ message: 'Playlist deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
