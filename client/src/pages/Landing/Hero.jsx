import { ArrowRight, Briefcase, Users, Building2 } from "lucide-react";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0B1120] text-white">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-violet-700/20 blur-3xl"></div>

<div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl"></div>
     <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-between gap-16 px-8 py-20 lg:flex-row">

        {/* Left Side */}
        <motion.div
  className="max-w-2xl"
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 1,
    ease: "easeOut",
  }}
>

          <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
  Campus Placements
</span>
          <h1 className="mt-8 text-6xl font-extrabold leading-tight">
            Transform Your
            <span className="block text-violet-500">
              Campus Placements
            </span>
          </h1>

          <p className="mt-8 text-lg leading-8 text-gray-400">
            PlaceSync connects Students, Recruiters and Placement Officers
            on one intelligent platform with AI powered resume management,
            smart eligibility filtering and real-time placement tracking.
          </p>

          <div className="mt-10 flex gap-5">

           <button className="group flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:bg-violet-500">
              Get Started
              <ArrowRight size={18} />
            </button>

            <button className="rounded-xl border border-gray-700 px-8 py-4 transition hover:border-violet-500">
              Explore Features
            </button>

          </div>

        </motion.div>

        {/* Right Side */}

        {/* Dashboard Preview */}

<motion.div
  className="relative w-full max-w-xl"
  initial={{ opacity: 0, x: 80 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{
    duration: 0.9,
    delay: 0.3,
    ease: "easeOut",
  }}
>

 <motion.div
  whileHover={{
    y: -8,
    scale: 1.02,
  }}
  transition={{
    duration: 0.3,
  }}
  className="rounded-3xl border border-gray-800 bg-[#111827]/90 backdrop-blur-xl p-7 shadow-[0_0_50px_rgba(124,58,237,0.2)]"
>

    {/* Header */}

    <div className="mb-8 flex items-center justify-between">

      <div>
        <p className="text-sm text-gray-400">
          Dashboard
        </p>

        <h2 className="text-2xl font-bold">
          PlaceSync
        </h2>
      </div>

      <div className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
        ● Live
      </div>

    </div>

    {/* Top Cards */}

    <div className="grid grid-cols-3 gap-4">

      <div className="rounded-xl bg-[#1F2937] p-4">
        <p className="text-gray-400 text-sm">
          Students
        </p>

        <h3 className="mt-2 text-2xl font-bold">
          2450+
        </h3>
      </div>

      <div className="rounded-xl bg-[#1F2937] p-4">
        <p className="text-gray-400 text-sm">
          Companies
        </p>

        <h3 className="mt-2 text-2xl font-bold">
          180+
        </h3>
      </div>

      <div className="rounded-xl bg-[#1F2937] p-4">
        <p className="text-gray-400 text-sm">
          Drives
        </p>

        <h3 className="mt-2 text-2xl font-bold">
          42
        </h3>
      </div>

    </div>

    {/* Analytics */}

    <div className="mt-8 rounded-xl bg-[#1F2937] p-5">

      <div className="mb-5 flex items-center justify-between">

        <h3 className="font-semibold">
          Placement Progress
        </h3>

        <span className="text-violet-400">
          72%
        </span>

      </div>

      <div className="h-3 rounded-full bg-gray-700">

        <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400"></div>

      </div>

      <div className="mt-6 space-y-4">

        <div>

          <div className="mb-2 flex justify-between text-sm">
            <span>Eligible Students</span>
            <span>1850</span>
          </div>

          <div className="h-2 rounded-full bg-gray-700">
            <div className="h-full w-[80%] rounded-full bg-violet-500"></div>
          </div>

        </div>

        <div>

          <div className="mb-2 flex justify-between text-sm">
            <span>Applications</span>
            <span>1325</span>
          </div>

          <div className="h-2 rounded-full bg-gray-700">
            <div className="h-full w-[65%] rounded-full bg-cyan-400"></div>
          </div>

        </div>

      </div>

    </div>

 </motion.div>

</motion.div>

      </div>
    </section>
  );
}

export default Hero;