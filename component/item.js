import React from 'react';
import {  View ,Text} from 'react-native';

const Item = (props) => (
    <View style= {{margin:16,justifyContent:'space-between',flexDirection:'row'}}>
        <Text>{props.item.title}</Text>
        <Text style ={{color : props.item.title == 'รายรับ'? '#388E3C':'#FF5252',fontWeight:'bold'}}>฿{props.item.value}</Text>
    </View>
);

export default Item
