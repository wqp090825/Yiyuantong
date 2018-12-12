import React,{Component} from 'react';
import {Route,NavLink,Switch,Redirect,withRouter} from 'react-router-dom';
import axios from 'axios';
import './css/listright.scss'
import { Carousel,Grid} from 'antd-mobile';
import qs from 'qs';
export class ListRight extends Component{
	constructor(){
		super();
		this.state={
			data:[],
			array:[],
			str:[]
		}
	}
	componentWillMount(){
		this.getdataslist('1497');
	}
	componentWillReceiveProps(datasurl){
//		console.log(datasurl.datas);
		let datas = datasurl.datas;
		this.getdataslist(datas);
	}
	setCookie(cname, cvalue, exdays) {
		    var d = new Date();
		    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		    var expires = "expires=" + d.toUTCString();
	//	    console.info(cname + "=" + cvalue + "; " + expires);
		    document.cookie = cname + "=" + cvalue + "; " + expires;
	//	    console.info(document.cookie);
    	}
	getdataslist(datas){
//		console.log(datas)
		let id = datas;
		let str = 'province=2; city=52; district=500; area_region=9; ECS[display]=grid; ECS[history_goods]=122122%2C125091%2C125911%2C125428%2C121716%2C122036%2C123387; goodsId=0; province=2; city=52; district=500; session_id_ip=61.144.97.251_8ebdb9d7a79cf97ac6b60fbb0a500dea; UM_distinctid=1675f491cd78d-072a89f17bf093-424e0b28-15f900-1675f491cd8ad; CNZZDATA1257355159=508007698-1543491539-http%253A%252F%252Fwww.so.com%252F%7C1543539082; ECSCP_ID=62b36edc604f24de38dc5a2a23408c5ce78a29ae; ECS[visit_times]=37';
		var arr=str.split('; ');
		  	var arr2=[];
			for (var i=0;i<arr.length;i++) {
				arr2=arr[i].split('=');
				this.setCookie(arr2[0],arr2[1],7);
			}
			//当前时间戳
	  		let time=new Date().getTime();	
	  		axios.get(`/syapi/mobile/index.php?r=category/index/childcategory&id=${id}`,

				{
					headers:{
						'X-Requested-With': 'XMLHttpRequest'
					}			
				})
	  			.then(res=>{
//					console.log(res.data.category[0].cat_id)
					console.log(res.data.category);
					
					let array = res.data.category;
					let str=array.map(item=>{
						return item.cat_id
					})
					let data=res.data.category[0].cat_id;
//					console.log(data)
	  				this.setState({
	  					data:data,
	  					array:array,
	  					str:str
	  				})
	  			})
	  			.catch((err)=>{
	  				console.log(err);
	  			})
		
	}
	render(){
		return <div className='ListRight'>
		{this.state.array.map(items=>(
			<ul>
				<h3>{items.name}</h3>
					{this.state.data.map(item=>(
						<li key={item.id}>
							<img src={item.cat_img}/>
							<p>{item.name}</p>
						</li>
					))}	
					</ul>
		))}
		</div>
	}
	
} 
ListRight = withRouter(ListRight);
export default ListRight;
