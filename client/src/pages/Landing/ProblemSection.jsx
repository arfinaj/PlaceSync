import { motion } from "framer-motion";
import { problems } from "../../data/landing";
import SectionTitle from "../../components/ui/SectionTitle";
function ProblemSection() {
  return (
    <section className="bg-[#08101E] py-28 text-white">
      <div className="mx-auto max-w-7xl px-8">

        <motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
>
  <SectionTitle
    badge="The Problem"
    title="Campus Placements are still"
    highlight="outdated."
    description="Traditional placement management relies on spreadsheets, manual communication and repetitive work that slows down everyone involved."
  />
</motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {problems.map((problem, index) => {
            const Icon = problem.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.6,
                }}
                whileHover={{
                  y: -8,
                }}
                className="rounded-3xl border border-gray-800 bg-[#111827] p-8 transition-all"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-violet-600/20 p-4 text-violet-400">
                  <Icon size={35} />
                </div>

                <h3 className="text-2xl font-bold">
                  {problem.title}
                </h3>

                <p className="mt-5 leading-8 text-gray-400">
                  {problem.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default ProblemSection;