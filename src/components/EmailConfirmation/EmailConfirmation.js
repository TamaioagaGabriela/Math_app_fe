import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

export default class Confirm extends Component {
  // A bit of state to give the user feedback while their email
  // address is being confirmed on the User model on the server.
  constructor(props) {
    super(props);
    this.state = { confirming: true };
  }

  // When the component mounts the mongo id for the user is pulled  from the
  // params in React Router. This id is then sent to the server to confirm that
  // the user has clicked on the link in the email. The link in the email will
  // look something like this:
  //
  // http://localhost:3000/confirm/5c40d7607d259400989a9d42
  //
  // where 5c40d...a9d42 is the unique id created by Mongo
  componentDidMount() {
    const { id } = this.props.match.params;
    console.log('emailconfirmation');
    console.log(this.state.confirming);

    fetch(`localhost:8000/email/confirm/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log('a ajuans aici');
        this.setState({ confirming: false });
      })
      .catch((err) => console.log(err));
  }
  // While the email address is being confirmed on the server a spinner is
  // shown that gives visual feedback. Once the email has been confirmed the
  // spinner is stopped and turned into a button that takes the user back to the
  // <Landing > component so they can confirm another email address.

  render() {
    console.log('emailconfirmation');
    console.log(this.state.confirming);
    return (
      <div className="confirm">
        {this.state.confirming ? (
          <Spinner size="8x" spinning={`'spinning'`} />
        ) : (
          <Link to="/login">
            <Spinner size="8x" spinning={`''`} />
          </Link>
        )}
      </div>
    );
  }
}
