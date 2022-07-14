import TweetCard from "./TweetCard";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import QRCodeReader from "../QRCodeReader";

const QR = new QRCodeReader();

export default function Tweets() {
  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(process.env.REACT_APP_TWITTER_API)
      .then((response) => response.json())
      .then((data) => {
        // TODO: API results should only contain tweets that contain a QR code.
        const filteredTweets = data.data.filter(
          (tweet) => tweet.attachments?.media_keys?.[0] !== undefined
        );
        const completeTweets = filteredTweets.map((tweet) => {
          const user = data.includes.users.find(
            (user) => user.id === tweet.author_id
          );
          const attachments = {
            media: tweet.attachments.media_keys.map((mediaKey) =>
              data.includes.media.find((media) => media.media_key === mediaKey)
            ),
          };
          return {
            ...tweet,
            user,
            attachments,
          };
        });
        setTweets(completeTweets);

        // Extract lightning data
        (async function () {
          for (let tw of completeTweets) {
            const qrImageUrl = tw.attachments?.media?.[0].url;
            if (qrImageUrl) {
              const code = await QR.decodeFromImage(qrImageUrl, {
                crossOrigin: "anonymous",
              });

              if (code.data) {
                setTweets((prevState) =>
                  prevState.map((prevTweet) => {
                    if (prevTweet.id !== tw.id) {
                      return prevTweet;
                    }
                    const href = !/^lightning:/.test(code.data)
                      ? "lightning:" + code.data
                      : code.data;
                    return { ...prevTweet, href };
                  })
                );
              } else {
                console.error(
                  `Trying to read QR Code failed for: ${qrImageUrl}`
                );
              }
            }
          }
        })();
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  if (tweets.length) return null;

  return (
    <div className="w-3/5 mx-auto py-20">
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress style={{ color: "white" }} />
        </Box>
      )}
      <div className="flex flex-col space-y-5">
        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </div>
  );
}
