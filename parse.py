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

with open('rag-out.txt', 'w') as f:
	f.write(json.dumps(songs, indent=2))
