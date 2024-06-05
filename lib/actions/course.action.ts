const getYoutubePlaylists = async () => {
  const apiKey = process.env.YOUTUBE_API;
  const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCC55Ebd8DNuRq7c-k7Pw8_A&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    return json?.items;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default getYoutubePlaylists;
