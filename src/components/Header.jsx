import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';
import logoTrivia from '../trivia.png';
import { addGravatarPicture } from '../redux/actions/playerAction';

class Header extends Component {
    state = {
      name: '',
      linkImage: '',
    }

    componentDidMount() {
      this.fetchInfoGravatar();
    }

    fetchInfoGravatar = async () => {
      const { reducerLogin: { email, name }, sendPictureGravatar } = this.props;
      console.log(this.props);
      const hash = md5(email).toString();
      const linkImage = `https://www.gravatar.com/avatar/${hash}`;
      sendPictureGravatar(linkImage);
      this.setState({ linkImage, name });
    }

    render() {
      const { name, linkImage } = this.state;
      const { player: { score } } = this.props;
      console.log(score);
      return (
        <header>
          <div>
            <img
              data-testid="header-profile-picture"
              src={ linkImage }
              alt="User avatar Gravatar"
            />
            <p
              data-testid="header-player-name"
            >
              Jogador:
              <span className="highlightedText">{ name }</span>
            </p>
          </div>
          <img className="logoTrivia" src={ logoTrivia } alt="Logo Trivia" />
          <p
            className="score-points"
            data-testid="header-score"
          >
            {'Pontos:'}
            {' '}
            <span className="highlightedText">{ score }</span>
          </p>
        </header>
      );
    }
}

Header.propTypes = {
  reducerLogin: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  sendPictureGravatar: PropTypes.func.isRequired,
  player: PropTypes.shape({
    score: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  sendPictureGravatar: (url) => dispatch(addGravatarPicture(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
