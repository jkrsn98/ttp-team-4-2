let wordList = [
  "hi",
  "hello",
  "happy",
  "coding"
]

export default function randomWords(){
  return wordList[Math.floor(Math.random()*wordList.length)];
}