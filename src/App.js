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

function App() {
  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("https://companjenapps.com/twitter-api/?q=%23SecretSatsa")
      .then((response) => response.json())
      .then((data) => {
        // TODO: API results should only contain tweets that contain a QR code.
        const filteredTweets = data.statuses.filter(
          (tweet) => tweet.entities?.media?.[0].media_url !== undefined
        );
        setTweets(filteredTweets);
        console.log(data.statuses);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  function handlePay(qrImage) {
    const imgUrl = qrImage.replace("http://", "https://");
    if (imgUrl) {
      qr.decodeFromImage(imgUrl, {
        crossOrigin: "anonymous",
      }).then((code) => {
        alert(`I should open from Alby: ${code.data}`);
      });
    } else {
      alert("Error: Tweet doesn't contain a valid QR code");
    }

    const qrCodes = document.querySelectorAll(".qr-code");
    qrCodes.forEach(function (qrCode) {
      const imgUrl = qrCode.src.replace("http://", "https://");
      qr.decodeFromImage(imgUrl, {
        crossOrigin: "anonymous",
      }).then((code) => {
        let newNode = document.createElement("a");
        newNode.setAttribute("href", "lightning:" + code.data);
        const newContent = document.createTextNode("Pay");
        newNode.appendChild(newContent);
        qrCode.after(newNode);
      });
    });
  }

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
          <>
            <Card sx={{ maxWidth: 600, mb: 3 }}>
              <CardHeader
                avatar={
                  <Avatar
                    src={tweet.user.profile_image_url}
                    alt="Profile image"
                  />
                }
                title={tweet.user.screen_name}
                subheader={tweet.created_at}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {tweet.text}
                </Typography>
              </CardContent>
              <CardActions>
                {tweet.entities?.media?.[0].media_url ? (
                  <Button
                    variant="contained"
                    onClick={() =>
                      handlePay(tweet.entities?.media?.[0].media_url)
                    }
                  >
                    Pay
                  </Button>
                ) : (
                  "No QR Code found"
                )}
              </CardActions>
            </Card>
          </>
        ))}
      </Container>
    </div>
  );
}

export default App;
