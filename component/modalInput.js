
import React, { Component } from 'react';
import { View, Text, TextInput, Button, TouchableHighlight } from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-material-dropdown';

const data = [{
    value: 'รายรับ',
}, {
    value: 'รายจ่าย',
}];

class modalInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickermodalVisible: false,
            date: new Date(),
            title: 'รายรับ',
            value: '',
            description:''
        };
    }

    isDateTimePickermodal = () => {
        this.props.isModal()
        setTimeout(() => {
            this.setState({ isDateTimePickermodalVisible: !this.state.isDateTimePickermodalVisible });
        }, 500);
    };

    handleDatePicked = date => {
        this.setState({ isDateTimePickermodalVisible: !this.state.isDateTimePickermodalVisible });
        setTimeout(() => {
            this.props.isModal()
            this.setState({ date })
            console.log( date)
        }, 500);
        
    };

    handleTitlePicked = title => {
        this.setState({ title })
    };

    handleConfirm = () => {
        const { title, value, description, date } = this.state
        var bodyJSON = {
            title: title,
            des: description,
            value: value,
            date: new Date(date)
        }
        fetch(`http://localhost:3000/api/items?access_token=YMZrEFJGEAu1jpve6nCmAJ6Ce0o7WlVKaHo6DC58kly7lpJNBHCX9Ehq4vJlaBkn`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodyJSON),
        }).then((response) => Promise.all([response, response.json()]))
            .then(([response, responseJson]) => {
                if (response.ok) {
                    this.props.refresh()
                    this.handleCancel()
                } else {
                 
                }
            }).catch(error => {
              
            });
    };

    handleCancel = () => {
        this.props.isModal()
        this.setState({  
            date: new Date(),
            title: 'รายรับ',
            value: '',
            description:'' 
        })
        setTimeout(() => {
            this.props.isModal()
            this.setState({ date })
            console.log( date)
        }, 500);
    };

    render() {
        const { isDateTimePickermodalVisible, date, title, description, value } = this.state
        return (
            <View >
                <DateTimePicker
                    isVisible={isDateTimePickermodalVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.isDateTimePickermodal}
                    format="YYYY-MM-DD"
                    date ={date}
                />
                <Modal isVisible={this.props.isModalVisible} onBackdropPress={this.handleCancel} >
                    <View style={{ backgroundColor: '#fff', padding: 10 ,justifyContent:''}}>
                        <Text>เพิ่ม</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10, }}>
                            <Text style={{marginTop:10}}>วันที่ : </Text>
                            <Button title={ Moment(date).format('L')} onPress={this.isDateTimePickermodal}></Button>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10, }}>
                            <View  style={{width:100}}>
                                <Dropdown
                                    data={data}
                                    onChangeText={this.handleTitlePicked}
                                    value={title}
                                />
                            </View>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, padding: 10 ,flex:1}}
                                onChangeText={(description) => this.setState({ description })}
                                value={description.toString()}
                                placeholder='รายละเอียด'
                            />
                        </View>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, padding: 10 }}
                            onChangeText={(value) => this.setState({ value })}
                            value={value.toString()}
                            placeholder='0'
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                            <TouchableHighlight
                                style={{ width: 100, justifyContent: 'center', margin: 5, backgroundColor: '#00C853' }}
                                onPress={this.handleConfirm}>
                                <View style={{ alignItems: 'center', padding: 5 }}>
                                    <Text style={{ fontSize: 16, color: '#fff' }}>
                                        ยืนยัน
                                    </Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight style={{ width: 100, justifyContent: 'center', margin: 5, backgroundColor: '#B71C1C' }} onPress={this.handleCancel}>
                                <View style={{ alignItems: 'center', padding: 5 }}>
                                    <Text style={{ fontSize: 16, color: '#fff' }}>
                                        ยกเลิก
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View >
        );
    }
}

export default modalInput;