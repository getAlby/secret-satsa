import TweetCard from "./TweetCard";
import { useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import QRCodeReader from "../QRCodeReader";

const QR = new QRCodeReader();

export default function Tweets() {
  const [loading] = useState(false);
  const [tweets] = useState([
    {
      id: "1138505981460193280",
      created_at: "2019-06-11T17:59:13.000Z",
      text: "🎺 da-dada-DAH! We’re introducing the first Twitter Developer Labs endpoints: \n\n✨GET/users and GET/tweets ✨\n\nLabs is now open to all developers to start experimenting today 👉 https://t.co/eNx4Wc3Qwj https://t.co/ucmZrJAYjk",
      author_id: "2244994945",
      attachments: {
        media_keys: ["7_1138489597158199298"],
      },
      user: {
        profile_image_url:
          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200",
      },
      entities: {
        urls: [
          {
            start: 174,
            end: 197,
            url: "https://t.co/eNx4Wc3Qwj",
            expanded_url:
              "https://twittercommunity.com/t/twitter-developer-labs-is-open-to-all-developers/126717",
            display_url: "twittercommunity.com/t/twitter-deve…",
          },
          {
            start: 198,
            end: 221,
            url: "https://t.co/ucmZrJAYjk",
          },
        ],
      },
      format: "default",
    },
  ]);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch(process.env.REACT_APP_TWITTER_API)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // TODO: API results should only contain tweets that contain a QR code.
  //       const filteredTweets = data.data.filter(
  //         (tweet) => tweet.attachments?.media_keys?.[0] !== undefined
  //       );
  //       const completeTweets = filteredTweets.map((tweet) => {
  //         const user = data.includes.users.find(
  //           (user) => user.id === tweet.author_id
  //         );
  //         const attachments = {
  //           media: tweet.attachments.media_keys.map((mediaKey) =>
  //             data.includes.media.find((media) => media.media_key === mediaKey)
  //           ),
  //         };
  //         return {
  //           ...tweet,
  //           user,
  //           attachments,
  //         };
  //       });
  //       setTweets(completeTweets);

  //       // Extract lightning data
  //       (async function () {
  //         for (let tw of completeTweets) {
  //           const qrImageUrl = tw.attachments?.media?.[0].url;
  //           if (qrImageUrl) {
  //             const code = await QR.decodeFromImage(qrImageUrl, {
  //               crossOrigin: "anonymous",
  //             });

  //             if (code.data) {
  //               setTweets((prevState) =>
  //                 prevState.map((prevTweet) => {
  //                   if (prevTweet.id !== tw.id) {
  //                     return prevTweet;
  //                   }
  //                   const href = !/^lightning:/.test(code.data)
  //                     ? "lightning:" + code.data
  //                     : code.data;
  //                   return { ...prevTweet, href };
  //                 })
  //               );
  //             } else {
  //               console.error(
  //                 `Trying to read QR Code failed for: ${qrImageUrl}`
  //               );
  //             }
  //           }
  //         }
  //       })();
  //     })
  //     .catch((e) => console.error(e))
  //     .finally(() => setLoading(false));
  // }, []);

  return (
    <div className="w-3/5 mx-auto">
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress style={{ color: "white" }} />
        </Box>
      )}
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
}
