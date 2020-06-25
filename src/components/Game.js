import React, { Component } from "react";
import Pic1 from "./pic/pic1.png";
import Pic2 from "./pic/pic2.png";
import Pic3 from "./pic/pic3.png";
import Pic4 from "./pic/pic4.png";
import Pic5 from "./pic/pic5.png";
import Pic6 from "./pic/pic6.png";
import Pic7 from "./pic/pic7.png";
import Pic8 from "./pic/pic8.png";
import randomWords from './randomWords'


class Game extends Component {
constructor(props){
  super(props);
  this.state = {
    image: Pic1,
    images: [Pic1,Pic2,Pic3,Pic4,Pic5,Pic6,Pic7,Pic8],
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
    case 7:
      this.setState({image : Pic7});
      break;
    case 8:
      this.setState({image : Pic8});
      break;
    default:
        break;   
  }
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
      // if(this.state.turn)
      //   player = "Player1"
      // else
      //   player = "Player2"

        const guessedLetter = () =>{
          return this.state.answer.split('').map(letter => this.state.answerGot.includes(letter) ? 
          letter : " _ ")
        }
        const calculate=(e)=>{

          e.preventDefault();

          // this.setState({answerGot: this.state.})
          const letter = this.state.input;
          //Player 1 turn
          this.state.answer.includes(letter) ? this.state.answerGot.push(letter) : 
          this.setState({currentWrong: this.state.currentWrong + 1})
          console.log("ans got " + this.state.answerGot)
          console.log("crrent worng" + this.state.currentWrong)
          this.reRender();
          guessedLetter();
          // {   
          //   //Wins
          //   if(this.state.input == this.state.answerLeftOver.forEach(element => element))
          //       alert("Player 1 Winner")
          //       else{
          //             //Gets it wrong
          //             // if(this.state.input.length ==  1)
          //             //     if(!this.state.answerLeftOver.includes(this.state.input))
          //             //     //Gets it right
          //             //     else{
          //             //           this.setState({answerLeftOver: this.state.answerLeftOver.splice(this.state.answerLeftOver.indexof(this.state.input),1) })  
          //             //       }

          //                     this.reRender();
          //                     this.setState({turn : !this.state.turn})
          //                     console.log("In player 1" + this.state.currentWrong)
          //       }      
          // }
        // Player 2 turn
        // else{
        //   //Wins
        //   if(this.state.input == this.state.answer)
        //           alert("Player 2 Winner")
        //           {
        //             //Gets it wrong
        //             // if( this.state.input.length ==  1)
        //             //     if(!this.state.answerLeftOver.includes(this.state.input))
        //                        this.setState({currentWrong: this.state.currentWrong + 1})

        //             //   //Gets it right
        //             //     else{
        //             //       this.setState({answerLeftOver: this.state.answerLeftOver.splice(this.state.answerLeftOver.indexof(this.state.input),1) })  
        //             //     }
        //                       this.reRender();
        //                       this.setState({turn : !this.state.turn})
        //                       console.log("In player 2" +this.state.currentWrong)
        //           }
        // }
}


    return (
      <div >
        {status}
        <form>
        <label>
          {player}
          <input type="text" value={this.state.input} onChange={this.updateInput} />
        </label>
        <input onClick={calculate} type="submit" value="Submit" />
      </form>
      <p>{guessedLetter()}</p>


          
      </div>
    );
  }
}

export default Game;
