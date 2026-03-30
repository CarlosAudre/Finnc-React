import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function DashboardCalendar({year, navigateToPreviousYear, navigateToNextYear}) {
  const [direction, setDirection] = useState(0); // controla animação
  const currentYear = Number(year);
  const previousYear = currentYear - 1;
  const nextYear = currentYear + 1;

  const handlePrevious = () => {
    setDirection(-1);
    navigateToPreviousYear()
  };

  const handleNext = () => {
    setDirection(1);
    navigateToNextYear()
  };

  return (
    <div className="flex gap-2 items-center">
      {/* Previous */}
      <button
        onClick={handlePrevious}
        className="bg-gray-500/5 border border-white/10 text-white rounded-md cursor-pointer px-4 h-10 flex items-center justify-center
                   hover:scale-105 active:scale-95 transition"
      >
        {previousYear}
      </button>

      {/* Current */}
      <div className="relative w-20 h-10 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentYear}
            initial={{
              x: direction > 0 ? 50 : -50,
              opacity: 0,
            }}
            animate={{ x: 0, opacity: 1 }}
            exit={{
              x: direction > 0 ? -50 : 50,
              opacity: 0,
            }}
            transition={{ duration: 0.2 }}
            className="absolute w-full h-full"
          >
            <button className="w-full h-full bg-linear-to-r from-violet-500 to-violet-900 rounded-md flex items-center justify-center font-semibold">
              {currentYear}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Next */}
      <button
        onClick={handleNext}
        className="bg-gray-500/5 border cursor-pointer border-white/10 text-white rounded-md px-4 h-10 flex items-center justify-center
                   hover:scale-105 active:scale-95 transition"
      >
        {nextYear}
      </button>
    </div>
  );
}
