import React,{Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import './css/phone.scss';
export class Phone extends Component{
	constructor(){
        super();
        this.state={
			data:[],
			name:[],
			name2:[],
			data2:[]
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
		let str = 'province=2; city=52; district=500; area_region=9; ECS[display]=grid; ECS[history_goods]=125091%2C125911%2C125428%2C122122%2C121716%2C122036%2C123387; goodsId=0; province=2; city=52; district=500; session_id_ip=61.144.97.251_8ebdb9d7a79cf97ac6b60fbb0a500dea; UM_distinctid=1675f491cd78d-072a89f17bf093-424e0b28-15f900-1675f491cd8ad; CNZZDATA1257355159=508007698-1543491539-http%253A%252F%252Fwww.so.com%252F%7C1543539082; ECSCP_ID=84aa145e4a1bbd81d2bd81669071ecc339c8bbf9; ECS[visit_times]=24';
		var arr=str.split('; ');
		  	var arr2=[];
			for (var i=0;i<arr.length;i++) {
				arr2=arr[i].split('=');
				this.setCookie(arr2[0],arr2[1],7);
			}
			//当前时间戳
	  		let time=new Date().getTime();	
	  		axios.get(`/syapi/mobile/index.php?r=category/index/childcategory&id=1498`,
				{
					headers:{
						'X-Requested-With': 'XMLHttpRequest'
					}				
				})
	  			.then(res=>{
//					console.log(res.data.category);
					let name = res.data.category[0].name;
					let name2 = res.data.category[1].name;
					let data=res.data.category[0].cat_id;
					let data2=res.data.category[1].cat_id;
	  				this.setState({
							data:data,
							name:name,
							name2:name2,
							data2:data2
						});
	  			})
	  			.catch((err)=>{
	  				console.log(err);
	  			})
	}
	render(){
		return <div className='phone'>
				<ul>
					<h3>{this.state.name}</h3>
						{this.state.data.map(item => (
            					<li key={item.id}>
            					<img src={item.cat_img}/>
            					<p>{item.name}</p>
            					</li>
         					))}		
					</ul>
		</div>
	}
	
}

Phone = withRouter(Phone);
export default Phone;