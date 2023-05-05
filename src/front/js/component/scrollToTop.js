import React from "react";
import PropTypes from "prop-types";

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  handleFooterClick = () => {
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <>
        {React.Children.map(this.props.children, (child) =>
          React.cloneElement(child, {
            onClick: this.handleFooterClick, //add onClick prop to footer component
          })
        )}
      </>
    );
  }
}

ScrollToTop.propTypes = {
  location: PropTypes.object,
  children: PropTypes.any,
};

export default ScrollToTop;
