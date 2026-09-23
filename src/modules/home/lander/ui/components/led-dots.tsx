import React from "react";

const GLYPHS: Record<string, string[]> = {
  "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
  "1": ["010", "110", "010", "010", "010", "010", "111"],
  "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  "3": ["11110", "00001", "00001", "01110", "00001", "00001", "11110"],
  "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  "5": ["11111", "10000", "10000", "11110", "00001", "00001", "11110"],
  "6": ["01110", "10000", "10000", "11110", "10001", "10001", "01110"],
  "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  "9": ["01110", "10001", "10001", "01111", "00001", "00001", "01110"],
  ".": ["0", "0", "0", "0", "0", "0", "1"],
  I: ["111", "010", "010", "010", "010", "010", "111"],
  a: ["00000", "00000", "01110", "00001", "01111", "10001", "01111"],
  e: ["00000", "00000", "01110", "10001", "11111", "10000", "01110"],
  g: ["00000", "00000", "01111", "10001", "01111", "00001", "01110"],
  i: ["1", "0", "1", "1", "1", "1", "1"],
  l: ["10", "10", "10", "10", "10", "10", "01"],
  n: ["00000", "00000", "11110", "10001", "10001", "10001", "10001"],
  t: ["010", "010", "111", "010", "010", "010", "001"],
  r: ["00000", "00000", "10110", "11001", "10000", "10000", "10000"],
};

interface LedDotsProps {
  value: string;
  isWord?: boolean;
  isContext?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const LedDots: React.FC<LedDotsProps> = ({
  value,
  isWord = false,
  isContext = false,
  className = "",
  style,
}) => {
  const pitchX = isWord ? 4 : 5;
  const pitchY = 4;
  const gap = 1;
  const dotRadius = isWord ? 1.8 : isContext ? 2.32 : 1.55;

  let currentX = 0;
  const circles: Array<{ cx: number; cy: number; r: number; key: string }> = [];

  for (let i = 0; i < value.length; i++) {
    const char = value[i];
    const glyph = GLYPHS[char];
    if (!glyph) continue;

    const glyphWidth = glyph[0].length;

    for (let row = 0; row < 7; row++) {
      const rowStr = glyph[row] || "";
      for (let col = 0; col < rowStr.length; col++) {
        if (rowStr[col] === "1") {
          circles.push({
            cx: currentX + col * pitchX + 1.55,
            cy: row * pitchY + 1.55,
            r: dotRadius,
            key: `${i}-${row}-${col}`,
          });
        }
      }
    }

    currentX += glyphWidth * pitchX + gap;
  }

  const totalWidth = Math.max(currentX, 1);

  return (
    <svg
      viewBox={`0 0 ${totalWidth} 28`}
      className={`dot-svg ${className}`}
      fill="currentColor"
      style={style}
      aria-hidden="true"
    >
      {circles.map((c) => (
        <circle key={c.key} cx={c.cx} cy={c.cy} r={c.r} />
      ))}
    </svg>
  );
};
