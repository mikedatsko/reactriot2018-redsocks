import React, { Component } from 'react';
import './Field.css';

class Field extends Component {
  getFieldClassName(field) {
    const fieldLevelList = ['', ''];
    const fieldType = field.type || 'neutral';
    return ` ${fieldType} ${fieldLevelList[field.level]} field-level-${field.level}`;
  }

  renderFieldList() {
    return this.props.fieldList.map((field, index) => (
      <div
        key={'field' + index}
        className={'field ' + this.getFieldClassName(field)}
        onClick={() => this.props.selectField(field, index)}
      />
    ));
  }

  render() {
    return (
      <div className="fieldset">
        {this.props.isRunning && <div className="running" />}
        {this.renderFieldList()}
      </div>
    );
  }
}

export default Field;
