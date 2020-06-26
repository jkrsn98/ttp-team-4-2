let wordList = [
    "hi",
    "hello",
    "happy",
    "coding",
    "world",
    "interesting",
    "information",
    "education",
    "testing"
  ]
  
  export default function randomWords(){
    return wordList[Math.floor(Math.random()*wordList.length)];
  }
