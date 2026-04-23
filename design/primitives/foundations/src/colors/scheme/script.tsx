import { STORAGE_KEY } from "./storage";

export function ColorSchemeScript() {
  const ssrScript = `(function () {
  try {
    var savedTheme = localStorage.getItem("${STORAGE_KEY}");
    var supportDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (savedTheme !== "light" && supportDarkMode)) {
      document.documentElement.dataset.colorScheme = "dark";
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.dataset.colorScheme = "light";
      document.documentElement.style.colorScheme = "light";
    }
  } catch (e) {}
})()`;

  return <script dangerouslySetInnerHTML={{ __html: ssrScript }} />;
}
