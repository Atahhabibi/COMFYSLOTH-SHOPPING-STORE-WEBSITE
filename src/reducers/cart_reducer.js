
import {ADD_TO_CART,CLEAR_CART,COUNT_CART_TOTALS,REMOVE_CART_ITEM,TOGGLE_CART_ITEM_AMOUNT,} from '../actions'

const cart_reducer = (state, action) => {

  if(action.type===ADD_TO_CART){

    const{id,product,amount,color}=action.payload;

    const tempItem=state.cart.find((item)=>item.id===id+color);
    

    if(tempItem){

      const tempCart=state.cart.map((item)=>{

        if(item.id===id+color){

          let newAmount=item.amount+amount;

          if(newAmount>item.max){
            newAmount=item.max;
          }

          return {...item,amount:newAmount}
 
        }else{return item}

      })



      return{...state,cart:tempCart}



    }else{
      const newItem={
        id:id+color,
        name:product.name,
        color:color,
        amount:amount,
        image:product.images[0].url,
        price:product.price,
        max:product.stock,

      };
      return {...state,cart:[...state.cart,newItem]}
    }

  }


  if(action.type===REMOVE_CART_ITEM){
    return {...state,cart:state.cart.filter((item)=>item.id!==action.payload)}
  } 

  if(action.type===CLEAR_CART){
    return {...state,cart:[]}
  }

  if(action.type===TOGGLE_CART_ITEM_AMOUNT){
    const{id,value}=action.payload;

    const tempCart=state.cart.map((item)=>{

      if(item.id===id){

        if(value==='inc'){

          let newAmount=item.amount+1;
          if(newAmount>item.max){
            newAmount=item.max;
          }

          return {...item,amount:newAmount}
        }

        if(value==='dec'){
          let newAmount=item.amount-1;

          if(newAmount<2){
            newAmount=1;
          }

          return {...item,amount:newAmount}

        }
      

      }/* else{return item} */

      return item

    })

    return {...state,cart:tempCart}


  }

  if(action.type===COUNT_CART_TOTALS){

    const temp=state.cart.reduce((results,item)=>{

      const{price,amount}=item;

     results.totals+=(price*amount)
     results.items+=amount

     return results;


    },{totals:0,items:0})


   return {...state,total_items:temp.items,total_amount:temp.totals}
  }



  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
