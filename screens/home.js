
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import ListItem from '../component/listItem'
import FAB from 'react-native-fab'
import ModalInput from '../component/modalInput'
import API from '../api/api';
var _ = require('lodash');

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datePickerVisible: false,
            isModalVisible:false,
            date: new Date(),
            income: 0,
            expense : 0,
            total: 0
        };
    }

    componentDidMount() {
        this.getData()
    }

    isModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
    };

    isDateTimePicker = () => {
        this.setState({ datePickerVisible: !this.state.datePickerVisible });
    };

    handleDatePicked = date => {
        console.log(date)
        this.setState({ date },()=>{
            this.getData()
        })
        this.isDateTimePicker();
    };

    refresh = () => {
        this.getData()
    }

    getData(){
        const _this = this
        const { date } =  this.state;
        var nextDay = new Date(date);
        nextDay.setDate(date.getDate()+1);
        const dateStart = new Date(date.setHours(0)); 
        const dateEnd = new Date(nextDay.setHours(23)); 

        const filter = `{"where":{"date":{"between": ["${dateStart}","${dateEnd}"]}}}`
        API.get(`/items?filter=${filter}`)
        .then(function (response) {
            _this.setValue(response.data)
        })
        .catch(function (error) {
            
        })
    }

    setValue(listData){
        var income = _.sumBy(listData, function(o) { if(o.title == 'รายรับ'){return o.value;} });
        var expense = _.sumBy(listData, function(o) { if(o.title == 'รายจ่าย'){return o.value;} });

        if(income == undefined){
            income = 0
        }
        if(expense == undefined){
            expense = 0
        }

        const total = income - expense
        this.setState({
            income, expense, total, listData
        })
    }

    render() {
        const { datePickerVisible, date, isModalVisible, income, expense, total, listData } = this.state
        return (
            <View style={styles.container}>
                <DateTimePicker
                    isVisible={datePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.isDateTimePicker}
                    format="YYYY-MM-DD"
                    date ={date}
                />
                <ModalInput isModalVisible={isModalVisible} isModal = {this.isModal}  refresh = {this.refresh}/>
                <Button title={Moment(date).format('L')} onPress={this.isDateTimePicker}></Button>
                <View style={styles.body}>
                    <View style = {{alignItems: 'center',borderRightWidth:1,borderRightColor:'#E0E0E0',flex:1}}>
                        <Text>รายรับ</Text>
                        <Text style= {{color:"#388E3C"}}>฿{income}</Text>
                    </View>
                    <View style = {{alignItems: 'center',borderRightWidth:1,borderRightColor:'#E0E0E0',flex:1}}>
                        <Text>รายจ่าย</Text>
                        <Text style= {{color:"#FF5252"}}>฿{expense}</Text>
                    </View>
                    <View style = {{alignItems: 'center',flex:1}}>
                        <Text>รวม</Text>
                        <Text style= {{color : total >= 0? '#388E3C':'#FF5252'}}>฿{total}</Text>
                    </View>
                </View>
                <View style={styles.body}>
                <ListItem listData = {listData}/>
                </View>
                <FAB
                    buttonColor="red"
                    iconTextColor="#FFFFFF"
                    onClickAction={this.isModal}
                    visible={true}
                    iconTextComponent={<Text>+</Text>} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    body: {
        padding: 10,
        borderTopWidth:1,
        borderTopColor:"#E0E0E0",
        flexDirection:'row',
    }
});

export default Home;
