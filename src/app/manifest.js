export default function manifest() {
  return {
    name: "SuperXEpic",
    short_name: "SXE",
    description: "Global motion, design, and development studio.",
    start_url: "/",
    display: "standalone",
    background_color: "#e3e3db",
    theme_color: "#1a1614",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
