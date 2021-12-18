import About from "./components/About";
import Header from "./components/Header";
import Tweets from "./components/Tweets";
import How from "./components/HowSection";
import StepsSection from "./components/StepsSection";

function App() {
  return (
    <main>
      <Header />
      <Tweets />
      <About />
      <StepsSection />
      <How />
    </main>
  );
}

export default App;
