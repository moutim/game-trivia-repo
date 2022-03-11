import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
    state = {
      name: '',
      linkImage: '',
    }

    componentDidMount() {
      this.fetchInfoGravatar();
    }

    fetchInfoGravatar = async () => {
      const { reducerLogin: { email, name } } = this.props;
      const hash = md5(email).toString();
      const linkImage = `https://www.gravatar.com/avatar/${hash}`;
      this.setState({ linkImage, name });
    }

    render() {
      const { name, linkImage } = this.state;
      return (
        <header>
          <img
            data-testid="header-profile-picture"
            src={ linkImage }
            alt="User avatar Gravatar"
          />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">0</p>
        </header>
      );
    }
}

Header.propTypes = {
  reducerLogin: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,

};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Header);
