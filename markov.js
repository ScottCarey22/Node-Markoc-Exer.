/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chains = new Map();

    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i]
      let nextword = this.words[i + 1] || null;

      if (chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
    }
    this.chains = chains;
  }


  /** return random text from chains */
  static choice(ar) {
    return ar[Math.floor(Math.random * ar.length)]
  }

  makeText(numWords = 100) {
    // TODO
    // pick a random key to start with
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let output = [];


    // make the Markoc chain until reaching the terminating word
    while (output.length < numWords && key !== null) {
      output.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }
    return output.join(" ");
  }
}

module.exports = {
  MarkovMachine,
};
