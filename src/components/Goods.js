import React,{Component} from 'react';
import {connect} from 'react-redux';
import {cart as cartAction} from '../actions';
//export function Goods(){
//	return <div>购物车</div>
//}
import './Home/css/cartlist.scss';
import {List,Stepper,Icon} from 'antd-mobile';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons'
//使用哪个引用那个
library.add(faChevronLeft)
const Item = List.Item;
const Brief = Item.Brief;

class Goods extends Component{
	constructor(){
        super();
        this.state={
        	goodslist:[]
        }
        this.handlerClickIcon=this.handlerClickIcon.bind(this);
       }
	componentWillMount(){
		var goodslist = window.localStorage.getItem("data");
		var goodslist= JSON.parse(goodslist)
        this.setState({
            goodslist
        });
    }
	handlerClickIcon(){
		let {history}=this.props
		history.go(-1);
//		let path = '/home';
//		this.props.history.push(path)
	}
	render(){
		console.log(this.props.goodslist)
		return <div className="Goods">
					<div className='search'>
							<FontAwesomeIcon icon="chevron-left" className='icon-one' onClick={this.handlerClickIcon}/>
							购物车
					</div>
		<div className="GoodsList">
			<List>
				{
					this.props.goodslist.map(data=>{
						let qty = data.qty;
						return <Item
							key={data.goods_id}
							thumb={data.goods_thumb}
							extra={<Icon type="cross" onClick={this.props.remove.bind(this,data.goods_id)}/>}
						>
							{data.goods_name}
							<Brief>价格：<span className="price">{data.shop_price}</span></Brief>
							<Stepper showNumber size="small" value={qty} onChange={this.props.changeQty.bind(this,data.goods_id,qty)} />
						</Item>
					})
				}
			</List>
			</div>
		</div>
	}
}


let mapStateToProps = state=>{
	return {
		goodslist:state.cartReducer.goodslist
	}
}
let mapDispatchToProps = dispatch=>{
	return {
		remove(goods_id){
			dispatch(cartAction.remove(goods_id))
		},
		changeQty(goods_id,qty){
			console.log(goods_id,qty)
			dispatch(cartAction.change(goods_id,qty))
		}
	}
}
Goods = connect(mapStateToProps,mapDispatchToProps)(Goods);

export {Goods};