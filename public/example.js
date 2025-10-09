// Handle Enter key to trigger search
const input = document.getElementById("urlInput");
const button = document.getElementById("searchButton");
const iframeWindow = document.getElementById("iframeWindow");

// Run navigation when pressing Enter
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    button.click();
  }
});

// Click or Enter triggers navigation
button.addEventListener("click", (event) => {
  event.preventDefault();

  let url = input.value.trim();
  const searchEngine = "https://duckduckgo.com/?q=";

  // If empty, do nothing
  if (!url) return;

  // If it looks like a search (no dots or spaces)
  const isSearch = !url.includes(".") || url.includes(" ");

  if (isSearch) {
    url = searchEngine + encodeURIComponent(url);
  } else {
    // Add https if missing
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }
  }

  // Load the page through Ultraviolet proxy
  iframeWindow.src = __uv$config.prefix + __uv$config.encodeUrl(url);
});
