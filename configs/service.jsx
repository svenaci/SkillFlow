const YOUTUBE_BASE_URL = "GET https://www.googleapis.com/youtube/v3/search";

const getVideos = async (query) => {
  const params = {
    part: "snippet",
    q: query,
    maxResult: 2,
    key: process.env?.NEXT_PUBLIC_YOUTUBE_API_KEY,
  };

  const response = await axios.get(YOUTUBE_BASE_URL + "/search", { params });

  return response.data.items;
};

export default {
  getVideos,
};
