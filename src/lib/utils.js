function shuffleArray(array) {
  let shuffled = [];
  while (array.length > 0) {
    let randomIndex = Math.floor(Math.random() * array.length);
    shuffled.push(array[randomIndex]);
    array.splice(randomIndex, 1);
  }
  return shuffled;
}

export { shuffleArray };
