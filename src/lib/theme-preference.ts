export type Theme = "light" | "dark";

export const LIGHT_THEME_COLOR = "#fafafa";
export const DARK_THEME_COLOR = "#0a0a0a";

export function normalizeTheme(value: string | null): Theme {
  return value === "dark" ? "dark" : "light";
}

export const THEME_BOOTSTRAP_SCRIPT = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      var isAdmin = window.location.pathname.indexOf('/admin') === 0;
      var isDark = theme === 'dark' && !isAdmin;
      document.documentElement.classList.toggle('dark', isDark);
      var themeColor = document.querySelector('meta[name="theme-color"]');
      if (themeColor) themeColor.setAttribute('content', isDark ? '${DARK_THEME_COLOR}' : '${LIGHT_THEME_COLOR}');
    } catch(e) {}
  })();
`;
