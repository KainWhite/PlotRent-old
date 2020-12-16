import React from 'react';

import './common-components.scss';
import {FormElement} from './form-element';

class TemplateForm extends React.Component {
  render() {
    const formElements = this.props.formTemplate.map(
      (el) => <FormElement key={el.name}
                           value={this.props.data[el.name]}
                           title={el.title}
                           name={el.name}
                           type={el.type}
                           onChange={this.props.onChange}/>
    );

    return (<>{formElements}</>);
  }
}

export {TemplateForm};
