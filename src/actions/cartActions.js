export function add(data){
    return {
        type:'ADD_TO_CART',
        payload:data
    }
}

export function remove(goods_id){
    return {
        type:'REMOVE_FROM_CART',
        payload:goods_id
    }
}

export function change(goods_id,qty){
    return {
        type:'CHANGE_GOODS_QTY',
        payload:{goods_id,qty}
    }
}