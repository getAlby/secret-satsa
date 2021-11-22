import { useState, useEffect } from "react";
import jsQR from "jsqr";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import "./App.css";

let canvasElem;
let gCtx;
const defaultOption = { inversionAttempts: "attemptBoth" };

async function decodeFromImage(img, options = {}) {
  let imgDom = null;
  const opts = {
    ...defaultOption,
    ...options,
  };
  if (+img.nodeType > 0) {
    if (!img.src) {
      throw new Error("The ImageElement must contain a src");
    }
    imgDom = img;
  } else if (typeof img === "string") {
    imgDom = document.createElement("img");
    if (options.crossOrigin) {
      imgDom.crossOrigin = options.crossOrigin;
    }
    imgDom.src = img;
    const proms = () =>
      new Promise((resolve) => {
        imgDom.onload = () => resolve(true);
      });
    await proms();
  }

  let code = null;
  if (imgDom) {
    code = _decodeFromImageElm(imgDom, opts);
  }
  return code;
}

function _decodeFromImageElm(imgObj, options = {}) {
  const opts = {
    ...defaultOption,
    ...options,
  };
  const imageData = _createImageData(imgObj, imgObj.width, imgObj.height);

  // All same width / height???
  console.log(imageData);

  const code = jsQR(imageData.data, imageData.width, imageData.height, opts);

  if (code) {
    return code;
  }

  return false;
}

function _createImageData(target, width, height) {
  if (!canvasElem) {
    _prepareCanvas(width, height);
  }

  gCtx.clearRect(0, 0, width, height);
  gCtx.drawImage(target, 0, 0, width, height);

  const imageData = gCtx.getImageData(
    0,
    0,
    canvasElem.width,
    canvasElem.height
  );

  return imageData;
}

function _prepareCanvas(width, height) {
  if (!canvasElem) {
    canvasElem = document.createElement("canvas");
    canvasElem.style.width = `${width}px`;
    canvasElem.style.height = `${height}px`;
    canvasElem.width = width;
    canvasElem.height = height;
  }

  gCtx = canvasElem.getContext("2d");
}

function TweetCard({ tweet }) {
  const [href, setHref] = useState("");

  // TODO: Extracting lightning data seems to fail for many tweets...
  useEffect(() => {
    const qrImageUrl = tweet.attachments?.media?.[0].url;
    if (qrImageUrl) {
      decodeFromImage(qrImageUrl, {
        crossOrigin: "anonymous",
      })
        .then((code) => {
          if (code.data) {
            const link = !/^lightning:/.test(code.data)
              ? "lightning:" + code.data
              : code.data;
            setHref(link);
          }
        })
        .catch((e) => console.error(e));
    }
  }, [tweet]);

  return (
    <Card sx={{ maxWidth: 600, mb: 3 }}>
      <CardHeader
        avatar={
          <Avatar src={tweet.user.profile_image_url} alt="Profile image" />
        }
        title={tweet.user.name}
        subheader={tweet.created_at}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {tweet.text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" href={href} disabled={href === ""}>
          Pay
        </Button>
      </CardActions>
    </Card>
  );
}

function App() {
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
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="sm">
        <h1>Secret Satsa</h1>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        )}

        {tweets.map((tweet) => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))}
      </Container>
    </div>
  );
}

export default App;
