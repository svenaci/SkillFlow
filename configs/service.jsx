const YOUTUBE_BASE_URL = "GET https://www.googleapis.com/youtube/v3/search";

const getVideos = async (query) => {
  const params = {
    part: "snippet",
    q: query,
    maxResult: 2,
    key: process.env?.NEXT_PUBLIC_YOUTUBE_API_KEY,
  };
};
