export const waitForFonts = async () => {
  if (typeof window === "undefined") return true;
  try {
    // Wait for the browser font loading API to be ready
    await document.fonts.ready;

    const fontsToLoad = [
      "16px 'Big Shoulders Display'",
      "16px 'PP Neue Montreal'",
      "300 16px 'PP Neue Montreal'",
      "400 16px 'PP Neue Montreal'",
      "500 16px 'PP Neue Montreal'",
      "700 16px 'PP Neue Montreal'",
      "16px 'PP Pangram Sans'",
      "100 16px 'PP Pangram Sans'",
      "300 16px 'PP Pangram Sans'",
      "400 16px 'PP Pangram Sans'",
      "500 16px 'PP Pangram Sans'",
      "600 16px 'PP Pangram Sans'",
      "700 16px 'PP Pangram Sans'",
      "800 16px 'PP Pangram Sans'",
      "16px 'Geist Mono'"
    ];

    // Request explicitly loading all fonts and wait for the promises to resolve
    await Promise.all(fontsToLoad.map(font => document.fonts.load(font)));
    
    // Add a tiny buffer delay to let layout update and apply fonts
    await new Promise((resolve) => setTimeout(resolve, 100));
    return true;
  } catch (error) {
    console.error("waitForFonts error:", error);
    // Return true fallback so the application doesn't freeze in case of font error
    return true;
  }
};
