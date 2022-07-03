import Contact from "./_index/contact";
import Home from "./_index/home";
import Portfolio from "./_index/portfolio";
import Skill from "./_index/skill";

export default function Top() {
  return (
    <>
      <div className="font-hiragino bg-gradient-to-r from-yellow-200 via-green-200 to-green-500 opacity-80">
        <Home />
        <Skill />
        <Portfolio />
        <Contact />
      </div>
    </>
  );
}
