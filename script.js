async function getDefinition() {
  const word = document.getElementById("wordInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (word === "") {
    resultDiv.innerHTML = "<p>Please enter a word.</p>";
    return;
  }

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();

    if (data.title) {
      resultDiv.innerHTML = `<p>No definition found for <b>${word}</b></p>`;
      return;
    }

    const meaning = data[0].meanings[0];
    const definition = meaning.definitions[0].definition;
    const example = meaning.definitions[0].example || "No example available.";
    const partOfSpeech = meaning.partOfSpeech;

    resultDiv.innerHTML = `
      <h2>${word}</h2>
      <p><b>Part of Speech:</b> ${partOfSpeech}</p>
      <p><b>Definition:</b> ${definition}</p>
      <p><b>Example:</b> ${example}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = "<p>Something went wrong. Try again later.</p>";
  }
}
