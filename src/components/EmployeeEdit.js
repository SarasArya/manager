import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Modal } from 'react-native';
import Communications from 'react-native-communications';
import { Card, CardSection, Button, Confirm } from './common';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions/EmployeeActions';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    })
  }
  onButtonPress() {
    const { name, shift, phone } = this.props;
    console.log(name, shift, phone);
    this.props.employeeSave({ name, shift, phone, uid: this.props.employee.uid });
  }
  onTextPress() {
    const { phone, shift } = this.props;
    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }
  onAccept() {
    const { uid }  = this.props.employee;
    this.props.employeeDelete({ uid });
  }
  onReject() {
    this.setState({showModal : false })
  }

  render() {
    return (
      <Card>
        <EmployeeForm />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>
            Text Schedule
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.setState({showModal : !this.state.showModal })}>
            Fire
          </Button>
        </CardSection>

        <Confirm
        visible={this.state.showModal}
        onAccept={this.onAccept.bind(this)}
        onReject={this.onReject.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, shift, phone } = state.employeeForm;
  return {
    name, shift, phone
  };
};
export default connect(mapStateToProps, { employeeUpdate, employeeSave, employeeDelete })(EmployeeEdit);
