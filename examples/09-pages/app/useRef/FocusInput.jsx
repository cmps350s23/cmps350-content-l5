"use client";
import { useState, useRef, useEffect } from "react";

export default function FocusInput() {
  const [count, setCount] = useState(10);
  const inputRef = useRef();

  useEffect(() => {
    // Focus the input element when the component mounts
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        value={count}
        onChange={(e) => setCount(parseInt(e.target.value))}
      />
    </div>
  );
}
