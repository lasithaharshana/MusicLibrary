import mongoose from 'mongoose';

const playlistSchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  },
  {
    timestamps: true,
  }
);

export const Playlist = mongoose.model('Playlist', playlistSchema);
