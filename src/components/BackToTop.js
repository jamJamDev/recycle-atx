import React, { Component } from 'react';

class BackToTop extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    // Update "Back to Top" button to display when scrolling down
    var button = document.getElementById('scroll-top-btn');
    window.onscroll = function() {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        button.style.display = "block";
      } else {
        button.style.display = "none";
      }
    }
  }

  scrollToTop() {
    document.body.scrollTop = 0; // safari
    document.documentElement.scrollTop = 0; // other
  }

  render() {
    return (
        <button id='scroll-top-btn' className='back-to-top' onClick={this.scrollToTop}>Back to Top</button>
    )
  }
}

export default BackToTop;