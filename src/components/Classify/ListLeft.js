import React,{Component} from 'react';
import './css/listleft.scss';
import axios from 'axios';
import {Route,NavLink,Switch,Redirect,withRouter} from 'react-router-dom';
export class ListLeft extends Component{
	constructor(){
		super();
		this.state={
			tabs:[
				{
					type:'家用电器',
					sort:'1497',
				},
				{
					type:'手机数码',
					sort:'1498'
				},
				{
					type:'电脑办公',
					sort:'1499'
				},
				{
					type:'家装家居',
					sort:'1500'
				},
				{
					type:'男装女装',
					sort:'1501'
				},
				{
					type:'个护化妆',
					sort:'1502'
				},
				{
					type:'鞋靴箱包',
					sort:'1503'
				},
				{
					type:'运动户外',
					sort:'1504'
				},
				{
					type:'汽车用品',
					sort:'1505'
				},
				{
					type:'母婴玩具',
					sort:'1506'
				},
				{
					type:'食品酒类',
					sort:'1507'
				},
				{
					type:'营养保健',
					sort:'1508'
				},
				{
					type:'旅行、充',
					sort:'1510'
				},
				{
					type:'现金区',
					sort:'3367'
				},
				{
					type:'精品消费',
					sort:'2836'
				}	
			],
			currentTab:0
		}
		this.handlertab=this.handlertab.bind(this);
	}
	componentWillMount(){
		
	}
	
	handlertab(idx,sort){
		let currentTab=idx;
//		console.log(this.props);
		let {changesort}=this.props;
		changesort(sort);
		this.setState({
			currentTab
		})
		
	}
	render(){
		return <div className='ListLeft'>
			<ul>
				{this.state.tabs.map((item,idx)=>{
					return 	<li key={item.sort} onClick={this.handlertab.bind(this,idx,item.sort)}
							className={this.state.currentTab==idx?'active':''}
							>{item.type}</li>
				})
				}
			</ul>
		
		</div>
	}
	
} 

ListLeft = withRouter(ListLeft);
export default ListLeft;