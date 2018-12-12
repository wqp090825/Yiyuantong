import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import './css/household.scss';
import { Carousel,Grid} from 'antd-mobile';
export class Household extends Component{
	constructor(){
        super();
        this.state={
			name:[],
			title:[],
			img:[],
			str:[]
        }
	}
	setCookie(cname, cvalue, exdays) {
		    var d = new Date();
		    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		    var expires = "expires=" + d.toUTCString();
	//	    console.info(cname + "=" + cvalue + "; " + expires);
		    document.cookie = cname + "=" + cvalue + "; " + expires;
	//	    console.info(document.cookie);
	    }
	componentDidMount(){
//		//设置cookie
		let str = 'province=2; city=52; district=500; area_region=9; ECS[display]=grid; ECS[history_goods]=125091%2C125911%2C125428%2C122122%2C121716%2C122036%2C123387; goodsId=0; province=2; city=52; district=500; session_id_ip=61.144.97.251_8ebdb9d7a79cf97ac6b60fbb0a500dea; UM_distinctid=1675f491cd78d-072a89f17bf093-424e0b28-15f900-1675f491cd8ad; CNZZDATA1257355159=508007698-1543491539-http%253A%252F%252Fwww.so.com%252F%7C1543539082; ECSCP_ID=02ed639908b27650c6c868bccbc11540d39eac7a; ECS[visit_times]=23';
		var arr=str.split('; ');
		  	var arr2=[];
			for (var i=0;i<arr.length;i++) {
				arr2=arr[i].split('=');
				this.setCookie(arr2[0],arr2[1],7);
			}
			//当前时间戳
	  		let time=new Date().getTime();	
	  		axios.get(`/syapi/mobile/index.php?r=category/index/childcategory&id=1497`,
				{
					headers:{
						'X-Requested-With': 'XMLHttpRequest'
					}			
				})
	  			.then(res=>{
//	  				console.log(res.data.category[0].cat_id)
	  				let name = res.data.category[0].name;
	  				let str=res.data.category[0].cat_id;
	  				var tt = res.data.category[0].cat_id[0].cat_img
	  				let title= str.map((datas,idx)=>{
	  					return datas.name
	  				})
	  				let img= str.map((datas,idx)=>{
	  					return datas.cat_img
	  				})
//	  				console.log(tt)
//	  				console.log(str2)
	  				this.setState({
							name:name,
							title:title,
							img:img,
							str:str
						});
	  			})
	  			.catch((err)=>{
	  				console.log(err);
	  			})

	}
	render(){
		return <div className='household'>
			<p>{this.state.name}</p>
			<div className='household-g'>
				<Grid
				            data={this.state.str} 
				            columnNum={3} 
				            activeClassName="active" 
				            itemStyle={{height:'100px',width:'300px'}}
				            renderItem={(datas,idx)=>{
				                return(
				                    <div className="goods-item">
				                        <img src={datas.cat_img} style={{ width: '60px', height: '60px' }}/>
				                        <p >{datas.name}</p>
				                    </div>
				                )
				            }}
		         			 />
		         </div>
		</div>
	}
} 
Household = withRouter(Household);
export default Household;
