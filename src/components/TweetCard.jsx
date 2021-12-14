import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";


export default function TweetCard({ tweet }) {
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
        <Button
          variant="contained"
          href={tweet.href}
          disabled={tweet.href === undefined}
        >
          Pay
        </Button>
      </CardActions>
    </Card>
  );
}
