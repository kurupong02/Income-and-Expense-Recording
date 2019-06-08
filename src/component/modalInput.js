
import React, { Component } from 'react';
import { View, Text, TextInput, Button, TouchableHighlight, StyleSheet } from 'react-native';
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

    showDateTimePicker = () => {
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
        this.setState({ date })
        this.cancelDateTimePicker()
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
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }

        API.post(`/items`, bodyJSON, headers)
            .then((response) => {
                if (response.status == 200) {
                    this.props.getData()
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
                    <View style={{ backgroundColor: '#fff', padding: 10 }}>
                        <Text>เพิ่ม</Text>
                        <View style={styles.viewRow}>
                            <Text style={{ marginTop: 10 }}>วันที่ : </Text>
                            <Button title={Moment(date).format('L')} onPress={this.showDateTimePicker}></Button>
                        </View>
                        <View style={styles.viewRow}>
                            <View style={{ width: 100 }}>
                                <Dropdown
                                    data={data}
                                    onChangeText={this.handleTitlePicked}
                                    value={title}
                                />
                            </View>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(description) => this.setState({ description })}
                                value={description.toString()}
                                placeholder='รายละเอียด'
                            />
                        </View>
                        <View style={styles.viewRow}>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(value) => this.setState({ value })}
                                value={value.toString()}
                                placeholder='0'
                            />
                        </View>
                        <View style={styles.buttonGroup}>
                            <TouchableHighlight style={styles.buttonConfirm} onPress={this.handleConfirm}>
                                <Text style={{ color: '#fff' }}>ยืนยัน</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.buttonCancel} onPress={this.handleCancel}>
                                <Text style={{ color: '#fff' }}>ยกเลิก</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    buttonConfirm: {
        width: 100,
        alignItems: 'center',
        backgroundColor: '#00C853',
        padding: 5
    },
    buttonCancel: {
        width: 100,
        alignItems: 'center',
        backgroundColor: '#B71C1C',
        padding: 5
    }
    , buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        padding: 10,
        flex: 1
    },
    viewRow: {
        flexDirection: 'row',
        marginTop: 10,
    }
});

export default modalInput;