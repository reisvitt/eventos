import React, { Component } from "react";
import "../Button/styles.css";

export default class ButtonLoader extends Component {
  state = {
    loading: false
  };

  fetchData = () => {
    this.setState({ loading: true });

    //Faking API call here
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  };


  render() {
    const { loading } = this.state;

    return (
      
      <div style={{ marginTop: "40px" }}>
        <button className="button" onClick={this.fetchData} disabled={loading}>
          {loading && (
            <i
              className="fa fa-refresh fa-spin"
              style={{ marginRight: "5px" }}
            />
          )}
          {loading && <span>Verificando dados</span>}
          {!loading && <span>Entrar</span>}
        </button>
      </div>
    );
  }
}
