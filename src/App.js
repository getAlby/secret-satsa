import { useState, useEffect } from "react";
import QrcodeDecoder from "qrcode-decoder";
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

const qr = new QrcodeDecoder();

function TweetCard({ tweet }) {
  const [href, setHref] = useState("");

  useEffect(() => {
    const qrImageUrl = tweet.attachments?.media?.[0].url;
    if (qrImageUrl) {
      qr.decodeFromImage(qrImageUrl, {
        crossOrigin: "anonymous",
      }).then((code) => {
        const link = !/^lightning:/.test(code.data)
          ? "lightning:" + code.data
          : code.data;
        setHref(link);
      });
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
        <Button variant="contained" href={href}>
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
