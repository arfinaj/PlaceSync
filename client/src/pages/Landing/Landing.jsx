import Navbar from "../../layouts/Navbar";
import Hero from "./Hero";
import ProblemSection from "./ProblemSection";
import SolutionTimeline from "../../components/landing/SolutionTimeline";

function Landing() {
  return (
    <>
      <Navbar />
       <Hero />
      <ProblemSection />
      <SolutionTimeline />
      <div className="min-h-screen bg-[#0B1120] text-white">
        <h1 className="pt-20 text-center text-5xl font-bold">
          Welcome to Place<span className="text-violet-500">Sync</span>
        </h1>
      </div>
     
    </>
  );
}

export default Landing;