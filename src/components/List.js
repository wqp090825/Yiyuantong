import React,{Component} from 'react';
import {Tabs, Badge} from 'antd-mobile';

import {ListLeft} from './Classify/ListLeft';
import {ListRight} from './Classify/ListRight';
import {Route,NavLink,Switch,Redirect,withRouter} from 'react-router-dom';

import './Classify/css/class.scss';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch,faAngleLeft,faBolt,faChevronLeft} from '@fortawesome/free-solid-svg-icons'
//使用哪个引用那个
library.add(faSearch,faAngleLeft,faBolt,faChevronLeft)
export class List extends Component{
	constructor(){
		super();
		this.state={
			currentTab:0,	
	}
		this.handlerClickIcon=this.handlerClickIcon.bind(this);
		this.changesort=this.changesort.bind(this);
	}
	componentWillMount(){
//		console.log(this.props.location);
		let {state:datas} =this.props.location;
		if(datas){
			localStorage.setItem('datas',JSON.stringify(datas));
		}else{
			datas=JSON.stringify(localStorage.getItem('datas'));
			let id = JSON.stringify(localStorage.getItem('datas')).id;
			datas=JSON.stringify(localStorage.getItem('datas'));
		}
		this.setState({
			datas:''
//			changedata:''//设置一个空的数组，用来接收listleft里传过来的值
		})
	}
	
	handlerClickIcon(){
		let {history}=this.props
//		history.go(-1);
		let path = '/home';
		this.props.history.push(path)
	}
	changesort(sort){
//		console.log(sort)
		this.setState({datas:sort});
	

	}
	render(){
		let {match} = this.props;
		return <div className="list">
			
			    <div className="head">
			    	<FontAwesomeIcon icon="chevron-left" className='icon-one' onClick={this.handlerClickIcon}/>
			    	<input type="" placeholder='商品/店铺搜索'/>
			    	<FontAwesomeIcon icon="search" className='icon-two'/>
			    </div>
			    <ListLeft changesort={this.changesort} className='ListLeft'></ListLeft>
			    <ListRight datas={this.state.datas} className='ListRight'></ListRight>
		</div>
	}
}
List = withRouter(List);
export default List;