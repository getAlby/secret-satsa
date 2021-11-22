const express = require("express");
const dotenv = require("dotenv");
const needle = require("needle");

const app = express();

dotenv.config();

const BEARER_TOKEN = process.env.BEARER_TOKEN;
const PORT = process.env.PORT || 3000;

const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

// TODO: Filter tweets that don't have media attached.
// TODO: Cache results.
// TODO: Pagination.
async function getTweets(query) {
  function buildQuery() {
    let q = {
      query,
      max_results: 100,
      expansions: "author_id,attachments.media_keys",
      "tweet.fields": "author_id,created_at",
      "media.fields": "height,media_key,type,url,width",
    };
    return q;
  }

  const response = await needle("get", endpointUrl, buildQuery(), {
    headers: {
      "User-Agent": "v2RecentSearchJS",
      authorization: `Bearer ${BEARER_TOKEN}`,
    },
  });

  return response.body;
}

app.get("/", async (req, res) => {
  try {
    let twitterData = await getTweets("#SecretSatsa");
    res.send(twitterData);
  } catch (error) {
    res.send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
