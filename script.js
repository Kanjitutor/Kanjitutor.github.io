// Load the kanji data from the .json file
fetch("kanji.json")
  .then(response => response.json())
  .then(data => {
    // Get the HTML elements
    const kanjiEl = document.getElementById("kanji");
    const meaningEl = document.getElementById("meaning-text");
    const onReadingEl = document.getElementById("on-reading-text");
    const kunReadingEl = document.getElementById("kun-reading-text");
    const flipBtn = document.getElementById("flip-btn");
    const meaningsEl = document.getElementById("meanings");

    // Initialize the kanji index to a random integer between 0 and the number of kanji in the data
    let kanjiIndex = Math.floor(Math.random() * Object.keys(data).length);

    // Show the current kanji symbol
    showKanjiSymbol();

    // Add an event listener to the flip button
    flipBtn.addEventListener("click", () => {
      // Toggle the visibility of the meanings box
      meaningsEl.classList.toggle("hidden");

      // If the meanings box is visible, show the meanings and readings for the current kanji
      if (!meaningsEl.classList.contains("hidden")) {
        meaningEl.textContent = data[Object.keys(data)[kanjiIndex]].meanings[0];
        onReadingEl.textContent = data[Object.keys(data)[kanjiIndex]].readings_on.join(", ");
        kunReadingEl.textContent = data[Object.keys(data)[kanjiIndex]].readings_kun.join(", ");
      } else {
        // Otherwise, just show the kanji symbol
        showKanjiSymbol();
      }
    });

    // Add an event listener to the document to detect space key presses
    document.addEventListener("keydown", event => {
      if (event.code === "Space") {
        // Trigger the click event for the flip button
        flipBtn.click();
      }
    });

    function showKanjiSymbol() {
      kanjiEl.textContent = Object.keys(data)[kanjiIndex];
      meaningEl.textContent = "";
      onReadingEl.textContent = "";
      kunReadingEl.textContent = "";
      
      // Update the kanji index to the next kanji in the data
      kanjiIndex = (kanjiIndex + 1) % Object.keys(data).length;
    }
  });
