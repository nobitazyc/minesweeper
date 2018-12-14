import React, { Component } from 'react';
// import { instanceOf } from 'prop-types';
// import { withCookies, Cookies } from 'react-cookie';
import Cookies from 'js-cookie';
import axios from 'axios';


class Gamemap extends Component{

  constructor(props){
    super(props);
    this.state = {
      crf_token: Cookies.get('csrftoken'),
      user: 'admin',
      gameMap: [],
      flagMap:[],
      level: 1,
      lost: false,
      win: false
    }

  }
  componentDidMount(){
    axios.get('/minesweeperApp/usermap/').then((data) => {
      this.setState({gameMap:JSON.parse(data.data.map)},this.setFlag);
    })
  }

  setFlag(){
    let rowsLength = this.state.gameMap.length;
    let columnLength = this.state.gameMap[0].length;
    let flags = []
    for(let i = 0; i<rowsLength; i++){
      let row = [];
      for (let j = 0; j<columnLength; j++){
        row.push(0);
      }
      flags.push(row);
    }
    this.setState({flagMap: flags});
  }

  handleClick(e,row,column) {
    if((this.state.flagMap.length && this.state.flagMap[row][column] === 1) || this.state.lost){
      return;
    }
    axios.post('/minesweeperApp/usermap/',
      {row:row,column:column},
      {headers:{
        'X-CSRFTOKEN': this.state.crf_token
      }}
    ).then((data) => {
      this.setState({gameMap:JSON.parse(data.data.map)},this.checkLost);
    })
  }

  contextMenu(e,index1,index2) {
      e.preventDefault();
      let flagMapCopy = this.state.flagMap;
      flagMapCopy[index1][index2] = 1-flagMapCopy[index1][index2];
      this.setState({flagMap:flagMapCopy});
  }

  checkLost(){
    let count = 0
    this.state.gameMap.map((row) => {
      row.map((cell) => {
        if(cell[1] == 0){
          count++;
        }
        if(cell[0] == -1 && cell[1] == 1){
          this.setState({lost:true});
        }
      })
    });
    if(count === 8){
      this.setState({win:true});
    }
  }

  resetMap(e) {
    axios.post('/minesweeperApp/refresh/',{},
      {headers:{
        'X-CSRFTOKEN': this.state.crf_token
      }}
    ).then((data) => {
      console.log(data);
      this.setState({gameMap:JSON.parse(data.data.map)},this.setFlag);
    });
    this.setState({lost:false});
    this.setState({win:false});
  }

  render(){
    return (
      <div className="container">
          {this.state.gameMap.map((row,index1) => (
            <div>
            {row.map((cell,index2)=> (
              <div
                onClick={(e) => {this.handleClick(e,index1,index2)}}
                onContextMenu={(e) => {this.contextMenu(e,index1,index2)}}
                className={
                  (cell[1] === 1 ? 'opened' : 'closed') +
                  (cell[0] === 0 ? ' transparent' : '') +
                  ' cell'
                }>
              { ((this.state.flagMap.length && this.state.flagMap[index1][index2]) === 1 ? <i class="fa fa-flag"></i> : (cell[0] === -1 ? <i class="fa fa-circle"></i> : cell[0])) }
              </div>
            ))}
            </div>
          ))}
          {this.state.lost ? <label>You Lost</label> : ''}
          {this.state.win ? <label>You Win</label> : ''}
          <button onClick={(e) => {this.resetMap(e)}}>reset</button>
      </div>

    )
  }
}
export default Gamemap;
