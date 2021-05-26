import React from 'react';
import {createGlobalStyle} from 'styled-components';
import styled from 'styled-components';
import {Menu, TodoTemplate, TodoHead, TodoItem, TodoCreate} from '../components';
import axios from 'axios';

const GlobalStyle = createGlobalStyle`
  body {
    background : #e9ecef;
  }
`;

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

class Home extends React.Component {
  
  constructor(props){
    super(props);
    this.state={
      lists : [],
      len : 0
    }
  }

  componentDidMount = async () => {
    await axios.get("http://localhost:5000/post/")
    .then((res) =>{
      console.log(res.data.postInfo);
      this.setState({lists:res.data.postInfo});  
    })
    
    this.setState({len : this.state.lists.filter(list => list.done === false).length})
    this.onToggle = this.onToggle.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onRemove = async(id) => {
    await this.setState({lists:this.state.lists.filter(list => list.id !== id)});
    this.setState({len : this.state.lists.filter(list => list.done === false).length})
  }

  onToggle(id) {
    let i;
    const NewTodo = this.state.lists.find((val, index)=>{
      if(val.id === id){
        i = index;
        return true;
      }
    })
    this.state.lists.splice(i, 1, {id:NewTodo.id, text:NewTodo.text, done:!NewTodo.done});
    this.setState({len : this.state.lists.filter(list => list.done === false).length});
  }

  onSubmit(text){
    alert(text);
  }

  render(){
    const {lists, len} = this.state;
    return (
      <div>
        <Menu />
        <GlobalStyle />
        <TodoTemplate>
          <TodoHead len={len}/>
          <TodoListBlock>
            {lists.map((val, index)=>{
                return (
                    <TodoItem key={val.id} Todo={val} onToggle={this.onToggle} onRemove={this.onRemove}></TodoItem>
                );
            })}
          </TodoListBlock>
          <TodoCreate onSubmit={this.onSubmit}/>
        </TodoTemplate>
      </div>
    );
  }
};

export default Home;