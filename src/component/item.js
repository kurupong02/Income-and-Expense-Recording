import React from 'react';
import {  View ,Text} from 'react-native';

const Item = (props) => (
    <View style= {{margin:16,justifyContent:'space-between',flexDirection:'row'}}>
        <View>
            <Text style= {{fontWeight:'bold'}}>{props.item.title}</Text>
            <Text style= {{color:'#757575'}}>{props.item.des}</Text>
        </View>
        <Text style ={{color : props.item.title == 'รายรับ'? '#388E3C':'#FF5252',fontWeight:'bold'}}>฿{props.item.value}</Text>
    </View>
);

export default Item
