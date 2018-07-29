import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as routes from '../../routes';

let redirect = false;
let destinationRoute = null;

// const SET_API_URL = 'http://localhost:3000';
const SET_API_URL = 'https://list-sublist-backend.herokuapp.com';

const googleLink = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${SET_API_URL}/oauth/google&scope=openid%20email%20profile&client_id=391898223520-nodlikiik4v7118fhe3lofn9n3irl3kd.apps.googleusercontent.com&prompt=consent&response_type=code`;

class Landing extends React.Component {
  componentDidMount() {
    if (this.props.loggedIn) {
      redirect = true;
      destinationRoute = '/dashboard';
      this.props.history.push(routes.DASHBOARD);
    }
  }

  render() {
    const loginView = (
      <div>
        <div>
          <h2 className='hero-text'>
          LISTsublist 
          </h2>
        </div>
        <div>
          <p><a href={googleLink}>Login/SignUp with Google</a></p>
        </div>
      </div>
    );

    return (
      <div className='landing-page'>
        { redirect ? <Redirect to={destinationRoute}/> : loginView }
      </div>
    );
  }
}

Landing.propTypes = {
  loggedIn: PropTypes.bool,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  loggedIn: !!state.token,
});

export default connect(mapStateToProps)(Landing);
