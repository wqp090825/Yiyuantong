import React,{Component} from 'react';
import {Route,NavLink,Switch,Redirect,withRouter} from 'react-router-dom';
import './My/css/login.scss';
import '../fonts/font-awesome.css';
import {Reg} from './My/Reg.js';
export class NoFind extends Component{
	constructor(){
        super();
        this.state={	
        	reg:[
        		{
					type:'登录',
					path:'/reg'
        		}
        	]
			}
         this.handlerGotoReg = this.handlerGotoReg.bind(this);
       }
	componentWillMount(){
		
	}
	handlerGotoReg(){
        //获取history
        let {match,history} = this.props;
        console.log(match);
//      history.push('/reg'); 
		let url = match.path +'/reg'
        history.push(url);
    }

	render(){
		 let {match} = this.props;
		return <div className='login'>
				<Switch>
				 	<Route path={match.url + "/reg"} component={Reg} />	
				</Switch>
				
				<div className='Loginone'>
					账号:<input className='Loginname' type="text" placeholder="用户名/手机号/邮箱"/>
				</div>
				<div className='Logintwo'>
					密码:<input className='Loginpass' type="text" placeholder="请输入密码"/>
				</div>
				<p>忘记密码?</p>
				<button className='button'>登录</button>
				<p className='newreg'  onClick={this.handlerGotoReg.bind(this)}>新用户注册</p>
				<div className='sanlogin'>
				<p className='three'>第三方登录</p>
				</div>
				<div className='last'>
					<div className='qq'>
						<i className="fa fa-qq" aria-hidden="true"></i>
						<h3>QQ</h3>
					</div>
					<div className='weibo'>
						<i className="fa fa-weibo" aria-hidden="true"></i> 
						<h3>微信</h3>
					</div>	
				</div>
				
		</div>
	}
	
}

NoFind = withRouter(NoFind);
export default NoFind;