import React, { Component } from "react";
import Pic1 from "./pic/pic1.png";
import Pic2 from "./pic/pic2.png";
import Pic3 from "./pic/pic3.png";
import Pic4 from "./pic/pic4.png";
import Pic5 from "./pic/pic5.png";
import Pic6 from "./pic/pic6.png";
import Pic7 from "./pic/pic7.png";
import Pic8 from "./pic/pic8.png";



class Game extends Component {
constructor(props){
  super(props);
  this.state = {
    image: Pic1,
    wrong : 8,
    currentWrong: 1 ,
    answer: "AB",
    answerGot: [],
    answerLeftOver: [],
    guessPickedAlready: [],
    input: "",
    turn: true,     // true = player 1 ; false = player2
    winner: ""
  }

}

componentDidMount(){
    this.setState({answerLeftOver :[...this.state.answer]})
    console.log("MOUNTING")
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


calculate=(e)=>{

            e.preventDefault();

            //Player 1 turn
            if(this.state.turn)
            {   
                  //Wins
                  if(this.state.input == this.state.answer)
                      this.setState({winner: "Player1"})
                      else{
                            
                            if(this.state.input.length ==  1)
                            {
                                  //Gets it wrong
                                if(!this.state.answerLeftOver.includes(this.state.input))
                                    this.setState({currentWrong: this.state.currentWrong + 1})
                                //Gets it right
                                else
                                {
                                  let i ;
                                     console.log("before left:" + this.state.answerLeftOver)
        
                                    for(i = 0; i < this.state.answerLeftOver.length; i++)
                                    {
                                      //found  and removing
                                      if(this.state.input == this.state.answerLeftOver[i])
                                        {
                                          this.state.answerLeftOver.splice(i, 1)
                                        }
                                    }
                                      console.log(this.state.input + " correct")
                              
                                    console.log("after left :" + this.state.answerLeftOver)
                                }
                                }
                                //Gets it wrong
                              else
                                  this.setState({currentWrong: this.state.currentWrong + 1})

                                this.reRender();
                                this.setState({turn : !this.state.turn})
                                // console.log("In player 1 : " + this.state.currentWrong)
                      }
                      // console.log("answer left 1 :" + this.state.answerLeftOver)
            }
          // Player 2 turn
          else{
            //Wins
            if(this.state.input == this.state.answer)
                    alert("Player 2 Winner")
                    {
                      if( this.state.input.length ==  1)
                      {
                            //Gets it wrong
                          if(!this.state.answerLeftOver.includes(this.state.input))
                                 this.setState({currentWrong: this.state.currentWrong + 1})
                           //Gets it right      
                          else
                          {
                            
                            let i ;
                            console.log("before left:" + this.state.answerLeftOver)

                           for(i = 0; i < this.state.answerLeftOver.length; i++)
                           {
                             //found  and removing
                             if(this.state.input == this.state.answerLeftOver[i])
                               {
                                 this.state.answerLeftOver.splice(i, 1)
                               }
                           }
                             console.log(this.state.input + " correct")
                     
                           console.log("after left :" + this.state.answerLeftOver)
                          }
                      }
                      //Gets it wrong
                      else
                      this.setState({currentWrong: this.state.currentWrong + 1})

                                this.reRender();
                                this.setState({turn : !this.state.turn})
                                // console.log("In player 2 : " +this.state.currentWrong)
                    }
                    // console.log("answer left 2 :" + this.state.answerLeftOver)
          }
}



updateInput = (e) =>{

        this.setState({input:  e.target.value})
}


  render() {
      console.log("answerleftover " + this.state.answerLeftOver)
    
      let player 
      let status

      if(this.state.turn)
        player = "Player1"
      else
        player = "Player2"


    if(this.state.currentWrong >= this.state.wrong + 1)
       status = "GAME OVER"
    else if(this.state.answerLeftOver.length == 0)
        status = ("Winner " + "The answer is" + this.state.answer) 
    else
        status = (<img src={this.state.image} alt="Pic"/>)


    return (
      <div >
        {status}
        <form>
        <label>
          {player}
          <input type="text" value={this.state.input} onChange={this.updateInput} />
        </label>
        <input onClick={this.calculate} type="submit" value="Submit" />
          </form>
        {}

          
      </div>
    );
  }
}

export default Game;
