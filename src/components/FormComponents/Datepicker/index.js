import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

export default class Datepicker extends React.Component {
  constructor(props) {
    super(props);
    //eh o estado do componente, dentro desse estado guardaremos todas as variaveis que utilizaremos
    this.state = {
      newCommentText: "",
    }; //fim this.state
  } //fim metodo construtor

  render() {
    return (
      <div className="form-date">
        <div>
          <label className="form-date-label">{this.props.text}</label>
        </div>
        <DatePicker
          dropdownMode
          className="form-date-container"
          selected={this.props.selected}
          onChange={this.props.onChange}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          placeholderText={this.props.text}
        />
      </div>
    ); //fim return
  } //fim metodo render
} //fim classe DatePicker
