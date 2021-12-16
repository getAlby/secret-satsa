// import Button from "@mui/material/Button";
import QRCodeIcon from "../assets/qr-code";

export default function TweetCard({ tweet }) {
  return (
    <div className="w-full shadow-sm border-[0.5px] border-solid border-grey-200 rounded-xl flex p-10 items-center">
      <div className="h-20 w-20 rounded-full overflow-hidden flex-none border-4 border-solid border-accent">
        <img
          src={tweet.user.profile_image_url}
          alt={tweet.user.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-1 px-7">{tweet.text}</div>
      <div className="flex-none flex space-x-2">
        <button
          onClick={() => window.open(tweet.href)}
          className="py-3 bg-dark-blue px-14 text-white rounded-lg"
        >
          Pay Now
        </button>
        <button className="p-2 bg-white text-dark-blue border-2 border-solid border-dark-blue hover:bg-dark-blue hover:text-white rounded-lg">
          <QRCodeIcon />
        </button>
        {/* <Button
          variant="contained"
          href={tweet.href}
          disabled={tweet.href === undefined}
        >
          Pay
        </Button> */}
      </div>
    </div>
  );
}
