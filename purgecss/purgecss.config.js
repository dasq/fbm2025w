module.exports = {
  content: [
    './**/*.html',  // Path to your HTML files (adjust as needed)
    './**/*.js'   // Path to your JavaScript files (if they use CSS classes)
  ],
  css: [
    './**/*.css' // Path to your CSS files (adjust as needed)
  ],
  // Optional: Add safelist if PurgeCSS is removing needed styles
  // safelist: {
  //   standard: [/^active$/, /^hidden$/] // Example: Keep classes starting with "active" or "hidden"
  // }
};