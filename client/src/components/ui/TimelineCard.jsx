import { motion } from "framer-motion";

function TimelineCard({ icon: Icon, title, description }) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      transition={{ duration: 0.25 }}
      className="relative rounded-2xl border border-gray-800 bg-[#111827] p-6"
    >
      <div className="mb-5 inline-flex rounded-xl bg-violet-600/20 p-3 text-violet-400">
        <Icon size={28} />
      </div>

      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-gray-400 leading-7">
        {description}
      </p>
    </motion.div>
  );
}

export default TimelineCard;