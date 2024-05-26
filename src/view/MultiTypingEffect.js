import React, { useState, useEffect } from "react";
import styles from "./MainView.module.css";

export default function MultiTypingEffect({ texts }) {
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingDelay = 60;
  const deletingDelay = 30;
  const endDelay = 1500;

  useEffect(() => {
    const currentText = texts[textIndex];
    let timer;

    const typeChar = () => {
      setDisplayText(currentText.substring(0, charIndex + 1));
      setCharIndex((prevIndex) => prevIndex + 1);
    };

    const deleteChar = () => {
      setDisplayText(currentText.substring(0, charIndex - 1));
      setCharIndex((prevIndex) => prevIndex - 1);
    };

    if (!isDeleting && charIndex < currentText.length) {
      timer = setTimeout(typeChar, typingDelay);
    } else if (isDeleting && charIndex > 0) {
      timer = setTimeout(deleteChar, deletingDelay);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    } else {
      timer = setTimeout(() => setIsDeleting(true), endDelay);
    }

    return () => clearTimeout(timer);
  }, [texts, textIndex, charIndex, isDeleting]);

  return (
    <div className={styles.typingEffect}>
      {displayText}
      <span className={styles.cursor} />
    </div>
  );
}
