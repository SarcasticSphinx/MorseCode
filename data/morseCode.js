const MORSE_CODE_DICT = {
  A: "▪--",
  B: "--▪▪▪",
  C: "--▪--",
  D: "--▪▪",
  E: "▪",
  F: "▪▪--▪",
  G: "--▪",
  H: "▪▪▪▪",
  I: "▪▪",
  J: "▪---",
  K: "--▪",
  L: "▪--▪",
  M: "--",
  N: "--▪",
  O: "---",
  P: "▪--▪",
  Q: "--▪--",
  R: "▪--",
  S: "▪▪▪",
  T: "--",
  U: "▪▪--",
  V: "▪▪▪--",
  W: "▪--",
  X: "--▪▪-",
  Y: "--▪--",
  Z: "--▪▪",
  1: "▪----",
  2: "▪▪---",
  3: "▪▪▪--",
  4: "▪▪▪▪-",
  5: "▪▪▪▪▪",
  6: "--▪▪▪▪",
  7: "---▪▪▪",
  8: "----▪▪",
  9: "-----▪",
  0: "-----",
  " ": "/",
};



// Convert text to Morse code
export const textToMorse = (text) => {
  return text
    .toUpperCase()
    .split("")
    .map((char) => MORSE_CODE_DICT[char] || "")
    .join(" ");
};

// Convert Morse code to text
export const morseToText = (morse) => {
  const reversedDict = Object.fromEntries(
    Object.entries(MORSE_CODE_DICT).map(([k, v]) => [v, k])
  );
  return morse
    .split(" ")
    .map((symbol) => reversedDict[symbol] || "")
    .join("");
};

