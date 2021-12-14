import React, {Component} from 'react';
import './Select_button.css';
import Thumb from './Thumb';

import { API } from 'aws-amplify';
import { updateComment } from '../graphql/mutations';

class Select_button extends Component{

    constructor(props){
        super();

        this.state = {
            select_button_is_checked: props.comment_list.adopted,
            now_user: props.now_user, //현재 로그인한 사람
            comment_list: props.comment_list,
            post_writer: props.post_writer, //게시물을 쓴 사람
            board_type: props.board_type,
            writer_user: props.writer_user,
        }
        //console.log('현재:',this.state.comment_list)
        //console.log("기본:", this.state.select_button_is_checked)
    }
    
    /*componentDidMount(){
        console.log("부모의 채택 여부 :", this.state.select_button_is_checked)
        
        if(this.state.comment_list.adopted == true){
            this.setState({
                select_button_is_checked: true,
                
            })
            console.log("부모가 adopted라 바꿈:", this.state.select_button_is_checked)
        }
        
    }*/

    componentDidUpdate(prevProps) {
        if (this.props.comment_list !== prevProps.comment_list) {
            this.setState({
                comment_list: this.props.comment_list,
                select_button_is_checked: this.props.comment_list.adopted,
            })
        }
        if(this.props.board_type !== prevProps.board_type){
            this.setState({board_type: this.props.board_type});
        }
        if(this.props.post_writer !== prevProps.post_writer){
            this.setState({post_writer: this.props.post_writer})
        }
        if (this.props.writer_user !== prevProps.writer_user) {
          this.setState({writer_user: this.props.writer_user})
        }
        if(this.props.now_user !== prevProps.now_user){
            this.setState({now_user: this.props.now_user})
        }
    }


    onClick = () => {
        API.graphql({query: updateComment, variables:{input: {id: this.state.comment_list.id,
            adopted: !this.state.select_button_is_checked,
            }}
        })
        .then(res => console.log(res))
        .catch(e => console.log(e))

        this.setState((prev) => {
            return{
                select_button_is_checked: !prev.select_button_is_checked,
            }
        })
    }
    

    render() {
        let {select_button_is_checked, now_user, comment_list, post_writer, post_board, writer_user} = this.state;
        
        console.log(select_button_is_checked)
        return (
            <div>
                {
                    select_button_is_checked ?
                    <div className="selected_star_img">
                        <img src={writer_user.profile_img} className="writer_img selected_img" /> 
                    </div>
                    :<img src={writer_user.profile_img} className="writer_img" /> 
                
                }
                {
                    select_button_is_checked ?
                    <div className="comment_user_name selected_name">{writer_user.name}</div>
                    :<div className="comment_user_name ">{writer_user.name}</div>
                }
                <Thumb 
                        comment_list={comment_list}
                        now_user={now_user}/>
                <div className="select_div">
                    {
                        post_writer.id==now_user.id ?
                        <div>
                        {
                            select_button_is_checked ?
                            <div className="select_yes" onClick={this.onClick}>
                                채택하기
                            </div>
                            :
                            <div className="select_no" onClick={this.onClick}>
                                채택하기
                            </div>
                        }
                        </div>
                        :
                        <div>
                        {
                            select_button_is_checked ?
                            <div className="select_yes">
                                채택된 댓글
                            </div>
                            :
                            <div className="select_no"></div> //채택안됨
                        }
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Select_button;