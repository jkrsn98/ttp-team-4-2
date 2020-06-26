import React, { Component } from "react";
import Pic1 from "./pic/pic1.png";
import Pic2 from "./pic/pic2.png";
import Pic3 from "./pic/pic3.png";
import Pic4 from "./pic/pic4.png";
import Pic5 from "./pic/pic5.png";
import Pic6 from "./pic/pic6.png";

import randomWords from './randomWords'
import './Game.css';

class Game extends Component {
constructor(props){
  super(props);
  this.state = {
    image: Pic1,
    images: [Pic1,Pic2,Pic3,Pic4,Pic5,Pic6],
    wrong : 8,
    currentWrong: 0 ,
    answer: randomWords(),
    answerGot: [],
    answerLeftOver: [],
    guessPickedAlready: [],
    input: "",
    turn: true,     // true = player 1 ; false = player2
  }

}

componentDidMount(){
    this.setState({answerLeftOver :[...this.state.answer]})
}



updateInput = (e) =>{
        this.setState({input: e.target.value})
        console.log("answerGot:" + this.state.answerGot)
        
}

reRender=()=>{

  switch(this.state.currentWrong)
  {
    case 1:
      this.setState({image : Pic1});
      break;
    case 2:
      this.setState({image : Pic2});
      break;
    case 3:
      this.setState({image : Pic3});
      break;
    case 4:
      this.setState({image : Pic4});
      break;
    case 5:
      this.setState({image : Pic5});
      break;
    case 6:
      this.setState({image : Pic6});
      break;
    default:
        break;   
  }
}

clearInput=()=>{
  document.getElementsByClassName("gameInput").reset();
}

  render() {
      console.log("answerleftover " + this.state.answerLeftOver)
      console.log("the answer is " + this.state.answer)
      let player 
      let status

      if(this.state.currentWrong >= this.state.wrong + 1)
      status = "GAME OVER"
      else
      status = (<img src={this.state.images[this.state.currentWrong]}/>)

        const guessedLetter = () =>{
          return this.state.answer.split('').map(letter => this.state.answerGot.includes(letter) ? 
          letter : " _ ")
        }
        const calculate=(e)=>{
          e.preventDefault();
          const letter = this.state.input;
          this.state.answer.includes(letter) ? this.state.answerGot.push(letter) : 
          this.setState({currentWrong: this.state.currentWrong + 1})
          console.log("ans got " + this.state.answerGot)
          console.log("crrent worng" + this.state.currentWrong)
          this.reRender();
          guessedLetter();
          this.setState({input: ''})
}


    return (
      <div className="main">
        {status}
        <form className="gameInput">
        <label>
          {player}
          <input type="text" maxLength="1" value={this.state.input} onChange={this.updateInput} />
        </label>
        <input onClick={calculate} type="submit" value="Submit" />
      </form>
      <p className="guessed">{guessedLetter()}</p>


          
      </div>
    );
  }
}

export default Game;
