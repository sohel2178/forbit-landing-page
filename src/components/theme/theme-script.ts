export type Theme = "light" | "dark";

/** localStorage key for an explicit choice. No key = follow the device. */
export const THEME_STORAGE_KEY = "forbit-theme";

export const THEME_COLORS: Record<Theme, string> = {
  dark: "#080B0D",
  light: "#FFFFFF",
};

/**
 * Runs synchronously in <head> before first paint (see Next.js guide
 * "Preventing flash before hydration"): saved choice → device preference.
 */
export const themeScript = `(function(){try{
var k=${JSON.stringify(THEME_STORAGE_KEY)},c=${JSON.stringify(THEME_COLORS)};
var s=localStorage.getItem(k);
var t=(s==="light"||s==="dark")?s:(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");
var d=document.documentElement;d.setAttribute("data-theme",t);d.style.colorScheme=t;
var f=function(){document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){m.setAttribute("content",c[t])})};
f();document.addEventListener("DOMContentLoaded",f);
}catch(e){}})();`;
