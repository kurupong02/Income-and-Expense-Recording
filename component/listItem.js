import React from 'react';
import { FlatList, View } from 'react-native';
import Item from './item'

const ListItem = (props) => (
    <View style={{ flex: 1,marginBottom:100 }}>
        <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={props.listData}
            style={{ backgroundColor: '#fff', height: "100%" }}
            renderItem={({ item }) =>
                <Item item={item} />
            }
        />
    </View>

);

export default ListItem;