import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Route,NavLink,Switch,Redirect,withRouter} from 'react-router-dom';
//现在是两个页面同时显示、然后想办法切换
//BrowserRouter<BrowserRouter/> 需要浏览器的支持，暂时不用
//HashRouter<HashRouter/> 用目前这个
////http://localhost/#/home
import {Home} from './components/Home';//没有用default，就用这个{}引入
import {List} from './components/List';
import {Goods} from './components/Goods';
import {NoFind} from './components/NoFind';
import {ShopStreet} from './components/Home/ShopStreet';//没有用default，就用这个{}引入
import {Attention} from './components/Home/Attention';
import {Indent} from './components/Home/Indent';
import {Money} from './components/Home/Money';
import {Service} from './components/Home/Service';
import {Goodlist} from './components/Home/Goodlist';
import {Reg} from './components/My/Reg.js';
import './css/css.css';
import {TabBar} from 'antd-mobile';
//引入样式
import 'antd-mobile/dist/antd-mobile.css'
import './scss/page.scss'
//fontawesome图标引入
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome,
		faListUl,
		faShoppingCart,
		faUserCircle} from '@fortawesome/free-solid-svg-icons'
//使用哪个引用那个
library.add(faHome,
			faListUl,
			faShoppingCart,
			faUserCircle)

class App extends Component {
	constructor(){
		super();
		this.state={
			tabs:[
				{
					type:'首页',
					path:'/home',
					icon:'home'
				},
				{
					type:'分类',
					path:'/list',
					icon:'list-ul'
				},
				{
					type:'购物车',
					path:'/goods',
					icon:'shopping-cart'
				},
				{
					type:'我的',
					path:'/404',
					icon:'user-circle'
				}
				
			],
			currentTab:0
		}
	}
	handlerClick(idx,path){
		this.setState({
			currentTab:idx
		})
//		console.log(this.props.history.location)
		if(this.props.history.location.pathname===path){
			return false;
		}
		this.props.history.push(path);
//		console.log(this.props)
	}
	componentWillMount(){
//      //获取hash值
console.log(this.props)
//		let hash = window.location.hash;
        let hash = window.location.hash.slice(1);//#list
//		console.log('yy',hash);
//      //找出对应索引值
        let currentTab = 0
        this.state.tabs.some((item,idx)=>{
			//some只读取一个后就不读取了
			//需要加一个判断，当所有的值都不匹配时，默认回到精确匹配的页。
			//没有加判断会默认到最后一页
            if(item.path === hash){
            	currentTab = idx;
            }
            return item.path === hash;//条件不成立时，‘/’
        });
        this.setState({
            currentTab
        });
//      console.log(this.props)
    }
	componentWillReceiveProps (nextProps) {//切换更新
//       console.log(nextProps)
        let hash=nextProps.location.pathname;
//      console.log(hash)
        let currentTab=0
        this.state.tabs.some((item,idx)=>{
            if(item.path===hash){
                currentTab=idx
            }
            return item.path===hash
        })
        this.setState({
            currentTab
        })
        
    }
  render() {
    return (
      <div className="container">
	       		<Switch>
								<Route path='/home' component={Home}/>
								<Route path='/list' component={List}/>
								<Route path='/goods' component={Goods}/>
								<Route path='/404' component={NoFind}/>
								<Route path='/attention' component={Attention}/>
								<Route path='/shopstreet' component={ShopStreet}/>
								<Route path='/indent' component={Indent}/>
								<Route path='/money' component={Money}/>
								<Route path='/service' component={Service}/>
								<Route path='/goodlist' component={Goodlist}/>
								<Redirect from='/' to='/home' exact/>/* 设置开关，当所有的值不匹配时，才跳转*/
								<Redirect to='/404'/>
					</Switch>
	        <TabBar
	        tintColor="#ff6a00"
	        noRenderContent={true}
	        hidden={!this.props.tabbarStatus}
	        >
	            {
	                this.state.tabs.slice(0,4).map((tab,idx)=>{
	                    return  <TabBar.Item
	                            title={tab.type}
	                            key={tab.path}
	                            icon={<FontAwesomeIcon icon={tab.icon}/>}
	                            selectedIcon={<FontAwesomeIcon icon={tab.icon} />}
	                            selected={this.state.currentTab === idx}
	                            onPress={this.handlerClick.bind(this,idx,tab.path)}
	                            badge={tab.path=='/goods'?this.props.cartQty:null}
	                            >
							</TabBar.Item>
				})
	    	}
				</TabBar>
	      </div>
	      
	      
    );
  }
}

let mapStateToProps = state=>{
    // 此处必须返回一个对象
//  console.log(state);
    return {
        //把state.commonReducer.tabbarStatus映射到props
        tabbarStatus:state.commonReducer.tabbarStatus,
        cartQty:state.cartReducer.goodslist.length
    }
}
//
App = connect(mapStateToProps)(App);
//把map映射到state里面
//connect执行完会返回一个函数
//利用高阶组件传递路由

//let mapStateToProps=state=>({tabbarStatus:state.commonReducer.tabbarStatus});//获取tabbar,infotab状态
//App = connect(mapStateToProps)(App);
App = withRouter(App);
export default App;
