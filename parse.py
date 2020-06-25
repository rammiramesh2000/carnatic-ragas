#!/usr/bin/env python
import json
capture_raaga = True

song_set = set()

with open('raag.txt', 'r') as f:
	raagam = None
	songs = []
	for line in f:
		line = line.strip()
		if line == '':
			capture_raaga = True
			this_song = {}
			continue
		if capture_raaga:
			raagam = line.rstrip('.').rstrip(',')
			capture_raaga = False
			continue
		this_line = line.split(' by ')
		composers = [] if len(this_line) == 1 else [this_line[1].strip().rstrip('.').rstrip(',')]
		song = this_line[0].strip().rstrip('.').rstrip(',')
		if song not in song_set:
			songs.append({
				"title": song,
				"raagas": [raagam],
				"composers": composers
			})
			song_set.add(song)

print("All Composers")
composers = set()
for song in songs:
	for c in song['composers']:
		composers.add(c)

for c in sorted(list(composers)):
	print(c) 

songsapi = """
const songlist =`"""
songsapi += json.dumps(songs, indent=2)
songsapi += """
`;

export const getAll = () => {
  const albumProm = new Promise((resolve) => {
    const songs = JSON.parse(songlist).sort((songA, songB) => (
      (songA.title.toUpperCase() < songB.title.toUpperCase()) ? -1 : 1
    ));

    let album = [];
    songs.map( song => song.raagas.map( raagam => {
      const shelf = album.find( shelf => shelf.raagam === raagam);
      (shelf === undefined) ? album.push({
            raagam: raagam,
            collapsed: false,
            songs: [song]
      }) : shelf.songs.push(song);
      return shelf;
    }));
    resolve(album.sort((albumA, albumB) => (albumA.raagam.toUpperCase() < albumB.raagam.toUpperCase()) ? -1 : 1));
  });
  return albumProm.then((album) => album);
}
"""

with open('src/SongsAPI.js', 'w') as f:
	f.write(songsapi)
