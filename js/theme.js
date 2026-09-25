const THEME_KEY = "theme";
const root = document.documentElement;
const themeToggle = document.querySelector("#theme-toggle");

function getPreferredTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);

    if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

function updateThemeButton(theme) {
    if (!themeToggle) {
        return;
    }

    const isDark = theme === "dark";

    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
    );

    const icon = themeToggle.querySelector("[data-theme-icon]");

    if (icon) {
        icon.textContent = isDark ? "☀" : "☾";
    }
}

function applyTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
    updateThemeButton(theme);
}

const initialTheme = getPreferredTheme();
applyTheme(initialTheme);

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const currentTheme = root.dataset.theme;
        const nextTheme = currentTheme === "dark" ? "light" : "dark";

        applyTheme(nextTheme);
    });
}