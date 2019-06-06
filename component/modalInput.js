
import React, { Component } from 'react';
import { View, Text, TextInput, Button, TouchableHighlight } from 'react-native';
import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import Modal from "react-native-modal";
import { Dropdown } from 'react-native-material-dropdown';
import API from '../api/api';

const data = [{
    value: 'รายรับ',
}, {
    value: 'รายจ่าย',
}];

class modalInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datePickerVisible: false,
            date: new Date(),
            title: 'รายรับ',
            value: '',
            description: ''
        };
    }

    isDateTimePicker = () => {
        this.props.isModal()
        setTimeout(() => {
            this.setState({ datePickerVisible: !this.state.datePickerVisible });
        }, 500);
    };

    cancelDateTimePicker = () => {
        this.setState({ datePickerVisible: !this.state.datePickerVisible });
        setTimeout(() => {
            this.props.isModal()
        }, 500);
    };

    handleDatePicked = date => {
        this.setState({ datePickerVisible: !this.state.datePickerVisible });
        setTimeout(() => {
            this.props.isModal()
            this.setState({ date })
        }, 500);
    };

    handleTitlePicked = title => {
        this.setState({ title })
    };

    handleConfirm = () => {
        const { title, value, description, date } = this.state
        const bodyJSON = {
            title: title,
            des: description,
            value: value,
            date: new Date(date)
        }
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }
        API.post(`/items`, bodyJSON, { headers: headers })
            .then((response) => {
                if (response.status == 200) {
                    this.props.refresh()
                    this.handleCancel()
                }
            })
            .catch((error) => {

            })
    };

    handleCancel = () => {
        this.props.isModal()
        this.setState({
            date: new Date(),
            title: 'รายรับ',
            value: '',
            description: ''
        })
    };

    render() {
        const { datePickerVisible, date, title, description, value } = this.state
        return (
            <View >
                <DateTimePicker
                    isVisible={datePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.cancelDateTimePicker}
                    format="YYYY-MM-DD"
                    date={date}
                />
                <Modal isVisible={this.props.isModalVisible} onBackdropPress={this.handleCancel} >
                    <View style={{ backgroundColor: '#fff', padding: 10, justifyContent: '' }}>
                        <Text>เพิ่ม</Text>
                        <View style={{ flexDirection: 'row', marginTop: 10, }}>
                            <Text style={{ marginTop: 10 }}>วันที่ : </Text>
                            <Button title={Moment(date).format('L')} onPress={this.isDateTimePicker}></Button>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10, }}>
                            <View style={{ width: 100 }}>
                                <Dropdown
                                    data={data}
                                    onChangeText={this.handleTitlePicked}
                                    value={title}
                                />
                            </View>
                            <TextInput
                                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10, padding: 10, flex: 1 }}
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