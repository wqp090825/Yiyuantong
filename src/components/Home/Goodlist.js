import React,{Component} from 'react';
import {Route,NavLink,withRouter} from 'react-router-dom';
import './css/goodlist.scss';
import { Button } from 'antd-mobile';
import {connect} from 'react-redux';
import {cart,tabbar} from '../../actions';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
//使用哪个引用那个
library.add(faChevronLeft)

export class Goodlist extends Component{
	constructor(){
        super();
        this.state={
        	data:{}
        }
	}
	handlerAddToCart(data){
//		this.props.addToCart(data);
		 window.localStorage.setItem('data',JSON.stringify(data));
//	 	console.log(this.props)
        let has = this.props.cartlist.filter(item=>{
            return item.goods_id == data.goods_id
        });
//		console.log(data)
        if(has.length){
            // 存在
            this.props.changeQty(data.goods_id,++data.qty);
        }else{
            data.qty = 1;
            this.props.addToCart(data);
        }
       
    }
	componentWillMount(){
//		var data = window.localStorage.getItem("data");
//		var data= JSON.parse(data);
		console.log(this.props)
//		this.props.changeTabbarStatus(false);
		let {state:data}=this.props.location;
		if(data){
            //本地存储
            localStorage.setItem('data',JSON.stringify(data));
       }else{
            data = JSON.parse(localStorage.getItem('data'));
          
       } 
       this.setState({
       	data
       })
     
    }
//	componentWillUnmount(){
//		this.props.changeTabbarStatus(true);
//	}
	render(){
//		let {state:goods}=this.props.location;
//		console.log(goods)
		var data = window.localStorage.getItem("data");
		var data= JSON.parse(data)
//      console.log(this.state.data);
		return <div className='goodlist'>
					<div className='search'>
						<NavLink to='/home'><FontAwesomeIcon icon="chevron-left" className='icon-one'/></NavLink>
						商品详情
					</div>
					
					<div className='goolist-data'>				
							<img src={data.goods_thumb}/>
							<h3>{data.goods_name}</h3>
							<h2>{data.shop_price}</h2>
							<p> 购买本商品可使用:{data.promote_price}</p>
							<Button type="primary" inline style={{ marginRight: '4px' }} className='Button' onClick={this.handlerAddToCart.bind(this,data)}>加入购物车</Button>
							<Button type="warning"  inline style={{ marginRight: '4px' }} className='Button'>直接购买</Button>
						</div>
			</div>
			
					
	}
}
let mapStateToProps=state=>({tabbarStatus:state.commonReducer.tabbarStatus,cartlist:state.cartReducer.goodslist});
let mapDispatchToProps = dispatch=>{
    return {
        // 把changeTabbarStatus方法映射到props
        changeTabbarStatus(status){
            dispatch(tabbar(status));
        },
        addToCart(data){
            dispatch(cart.add(data))
        },
        changeQty(goods_id,qty){
            dispatch(cart.change(goods_id,qty))
        }
    }
}
Goodlist = connect(mapStateToProps,mapDispatchToProps)(Goodlist);
//Goodlist = withRouter(Goodlist);
export default Goodlist;