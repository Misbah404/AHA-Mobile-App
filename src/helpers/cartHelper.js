import util from '../util';
import _, {
    isEmpty,
    findIndex,
  } from 'lodash';
import { Images } from '../theme';

export function addToCartList(previousCartList, comingCartListObject,) {
    let previousCartListArray = util.cloneDeep(previousCartList)
    // if cart is empty
    if (isEmpty(previousCartListArray)) {
      let tempArray =[]
      tempArray.push(comingCartListObject)
      return tempArray
    }
    const {id: postID,size: postSize, quantity: postQuantity} = comingCartListObject || {}
    // if cart is not empty
      const isNewlyAddedPostContainsSize = util.hasObjectWithKey(comingCartListObject, 'size');
      // if newly added post contains size
      if(!!isNewlyAddedPostContainsSize){
        // is post id already exist in cart
        const isPostIdAlreadyExistInCart = util.doesArrayContainsParticularId(previousCartListArray,postID)
        
        if(!!isPostIdAlreadyExistInCart){
          let isSameSizePostAlreadyExist = util.some(previousCartListArray, 
            (item)=> util.areValuesEqual(item.id, postID) && util.areValuesEqual(item.size, postSize))
          // if same size post already exist in cart
          if(!!isSameSizePostAlreadyExist){
            const mIndex = findIndex(previousCartList, (item)=> util.areValuesEqual(item.id, postID) 
            && util.areValuesEqual(item.size, postSize)) 
            const {quantity: previousQuantity} = previousCartListArray[mIndex]
            previousCartListArray[mIndex].quantity = postQuantity + previousQuantity
            return previousCartListArray
          } else {
            // if same size post doesn't exist
            let tempArray =[]
            tempArray.push(comingCartListObject,...previousCartListArray)
            return tempArray
          }
        } 
         // is post id doesn't exist in cart
        if(!!!isPostIdAlreadyExistInCart){
          let tempArray =[]
          tempArray.push(comingCartListObject,...previousCartListArray)
          return tempArray
        }
      } 
      // is  size doesn't exist in cart
      else{
         // is  size doesn't exist in cart
        const isPostIdAlreadyExistInCart = util.doesArrayContainsParticularId(previousCartListArray,postID)
       if(isPostIdAlreadyExistInCart){
        const mIndex = findIndex(previousCartList, (item)=> util.areValuesEqual(item.id, postID)) 
        const {quantity: previousQuantity} = previousCartListArray[mIndex]
        previousCartListArray[mIndex].quantity = postQuantity + previousQuantity
        return previousCartListArray
       }else{
        let tempArray =[]
        tempArray.push(comingCartListObject,...previousCartListArray)
        return tempArray
       }
      }
  }
export function updateMyCartList (previousCartListArray,updateQuantityAndId,updateQuantity){
    const {id: postID,size: postSize, } = updateQuantityAndId || {}
    const isNewlyAddedPostContainsSize = util.hasObjectWithKey(updateQuantityAndId, 'size');
    if(!!isNewlyAddedPostContainsSize){
        let isSameSizePostAlreadyExist = util.some(previousCartListArray, 
            (item)=> util.areValuesEqual(item.id, postID) && util.areValuesEqual(item.size, postSize))
            if(!!isSameSizePostAlreadyExist){
            const mIndex = findIndex(previousCartListArray, (item)=> util.areValuesEqual(item.id, postID) 
            && util.areValuesEqual(item.size, postSize)) 
            previousCartListArray[mIndex].quantity = updateQuantity
            return previousCartListArray 
         }
         else{
            const mIndex = findIndex(previousCartListArray, (item)=> util.areValuesEqual(item.id, postID)) 
            previousCartListArray[mIndex].quantity = updateQuantity
            return previousCartListArray 
         }           
     }else{
        const mIndex = findIndex(previousCartListArray, (item)=> util.areValuesEqual(item.id, postID)) 
        previousCartListArray[mIndex].quantity = updateQuantity
        return previousCartListArray 
     }
    
   }
export function removeObjectFromCartList  (array,item){
    const isNewlyAddedPostContainsSize = util.hasObjectWithKey(item, 'size');
    const {id: postID,size: postSize, } = item || {}
     if(!!isNewlyAddedPostContainsSize){
     const mIndex = findIndex(array, (item)=> util.areValuesEqual(item.id, postID) 
        && util.areValuesEqual(item.size, postSize)) 
        let data = [];
            array.map((x, _index) => {
            if (_index !== mIndex) data.push(x);
            });
      return data
     }
     else{
      return array.filter(x => x.id !==item.id)
     }}
export function  sumOfCartList (array){
            let sumOfArrayObject= array?.reduce(function(prev, item) {
               
                return prev + +item?.price*item.quantity
            }, 0);
            return sumOfArrayObject
      
 }

