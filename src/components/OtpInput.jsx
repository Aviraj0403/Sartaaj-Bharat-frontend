import React, { useRef } from "react";
import { motion } from "framer-motion";

const OtpInput = ({ length = 6, value, onChange }) => {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    if (!val) return;

    const digit = val.slice(-1).replace(/\D/, "");
    if (!digit) return;

    const newValue = value.split("");
    newValue[index] = digit;
    const finalValue = newValue.join("").slice(0, length);
    onChange(finalValue);

    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!value[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
      const newValue = value.split("");
      newValue[index] = "";
      onChange(newValue.join(""));
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (pasted) {
      onChange(pasted);
      const focusIndex = Math.min(pasted.length, length - 1);
      inputsRef.current[focusIndex]?.focus();
    }
  };

  return (
    <div className="flex gap-2 sm:gap-4 mt-6 justify-center flex-wrap">
      {Array.from({ length }).map((_, i) => (
        <motion.input
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength="1"
          value={value[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          className="
            w-10 h-12 sm:w-14 sm:h-16
            bg-white/5 border border-white/10
            text-center text-xl sm:text-2xl 
            font-black text-white rounded-xl sm:rounded-2xl
            focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20
            outline-none transition-all duration-300
            placeholder:text-slate-800/50
          "
          placeholder="•"
        />
      ))}
    </div>
  );
};

export default OtpInput;
