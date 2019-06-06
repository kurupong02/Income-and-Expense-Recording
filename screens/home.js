
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableHighlight } from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import ListItem from '../component/listItem'
import FAB from 'react-native-fab'
import ModalInput from '../component/modalInput'
import { connect } from "react-redux";
var _ = require('lodash');
// const axios = require('axios');
import axios from "axios";

// axios.defaults.baseURL = 'https://api.example.com';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            isModalVisible:false,
            date: new Date(),
            income: 0,
            expense : 0,
            total: 0
        };
    }

    isModal = () => {
        this.setState({ isModalVisible:  !this.state.isModalVisible });
    };

    isDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: !this.state.isDateTimePickerVisible });
    };

    handleDatePicked = date => {
        this.setState({ date },()=>{this.getData()})
        this.isDateTimePicker();

    };

    componentDidMount() {
        this.getData()
    }

    refresh = ()=>{
        this.getData()
    }

    async getData(){
        var { date } =  this.state;
        var nextDay = new Date(date);
        nextDay.setDate(date.getDate()+1);
        const dateStart = new Date(date.setHours(0)); 
        const dateEnd = new Date(nextDay.setHours(23)); 
        const filter = `{"where":{"date":{"between": ["${dateStart}","${dateEnd}"]}}}`
        const response = await fetch(`http://localhost:3000/api/items?filter=${filter}`);
        const json = await response.json();
        await this.setState({listData : json})
        await this.setValue()
    }

    setValue = () => {
        var income = _.sumBy(this.state.listData, function(o) { if(o.title == 'รายรับ'){return o.value;} });
        var expense = _.sumBy(this.state.listData, function(o) { if(o.title == 'รายจ่าย'){return o.value;} });

        if(income == undefined){
            income = 0
        }
        if(expense == undefined){
            expense = 0
        }
        var total = income - expense
        this.setState({
            income, expense, total
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <DateTimePicker
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.isDateTimePicker}
                    format="YYYY-MM-DD"
                    date ={this.state.date}
                />
                <ModalInput isModalVisible={this.state.isModalVisible} isModal = {this.isModal}  refresh = {this.refresh}/>
                <Button title={Moment(this.state.date).format('L')} onPress={this.isDateTimePicker}></Button>
                <View style={styles.body}>
                    <View style = {{alignItems: 'center',borderRightWidth:1,borderRightColor:'#E0E0E0',flex:1}}>
                        <Text>รายรับ</Text>
                        <Text style= {{color:"#388E3C"}}>฿{this.state.income}</Text>
                    </View>
                    <View style = {{alignItems: 'center',borderRightWidth:1,borderRightColor:'#E0E0E0',flex:1}}>
                        <Text>รายจ่าย</Text>
                        <Text style= {{color:"#FF5252"}}>฿{this.state.expense}</Text>
                    </View>
                    <View style = {{alignItems: 'center',flex:1}}>
                        <Text>รวม</Text>
                        <Text style= {{color : this.state.total >= 0? '#388E3C':'#FF5252'}}>฿{this.state.total}</Text>
                    </View>
                </View>
                <View style={styles.body}>
                <ListItem listData = {this.state.listData}/>
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

const mapState = (state) => ({
    listData: state.listData
});

const mapDispatch = ({ listData: { addItem }}) => ({
  
});

export default connect(mapState, mapDispatch)(Home);
