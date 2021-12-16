import Snowfall from "react-snowfall";
import HeaderImage from "../assets/images/background.png";

export default function Header() {
  return (
    <>
    <div className="bg-mandy-red min-h-screen grid pb-[4.5rem] relative">
      <div className="w-11/12 mx-auto pt-20 text-center relative">
        <img src={HeaderImage} alt="header" className="w-full h-[89%] object-contain" />
        <p className="text-white text-[32px] font-bold w-2/4 pt-9 mx-auto font-primary leading-tight">
          This holiday season, spend some sats for someone else with Alby!
        </p>
      </div>
       {/* TODO: find a better performing snow lib (seems a bit laggy on startup) */}
      </div>
      <Snowfall className=" min-h-screen" />
    </>
  );
}
