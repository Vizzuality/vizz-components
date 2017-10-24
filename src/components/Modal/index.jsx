import React, { Component } from 'react';

class Modal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visibility: props.visibility
    };
  }

  componentWillMount() {
    this.setConfig();
  }

  componentDidMount() {
    if (this.props.visibility) {
      // disables scroll window when modal is visible
      document.querySelector('body').style.overflow = 'hidden';

      this.setEventListeners();
    }
  }

  componentDidUpdate(prevProps, nextProps) {
    if (!nextProps.visibility) this.removeEventListeners();
  }

  onKeyDown(event) {
    // 27 => ESC key
    if (event.keyCode !== 27) return;

    this.closeModal();
  }

  setConfig() {
    // needs to be initialiazed and have a global scope inside the component
    // because of adding/removing event
    const onKeyDown = (e) => {
      this.onKeyDown(e);
    };

    this.config = {
      onKeyDown
    };
  }

  setEventListeners() {
    document.addEventListener('keydown', this.config.onKeyDown);
  }

  removeEventListeners() {
    document.removeEventListener('keydown', this.config.onKeyDown);
  }

  closeModal() {
    // enables scroll window when modal is invisible
    document.querySelector('body').style.overflow = null;

    this.setState({ visibility: false });
  }

  render() {
    return (
      this.state.visibility &&
        <div className={this.props.cssClasses.modal}>
          {this.props.veil &&
            <div
              className={this.props.cssClasses.veil}
              onClick={() => this.closeModal()}
            />}

          <div className={this.props.cssClasses.container}>
            <header className={this.props.cssClasses.header}>
              {this.props.closeable &&
                <div
                  className={this.props.cssClasses.btnClose}
                  onClick={() => this.closeModal()}
                />}
            </header>
            <section className={this.props.cssClasses.content}>
              {this.props.children}
            </section>
            {this.props.hasFooter &&
              <footer className={this.props.cssClasses.footer}>
                <button
                  className="btn-accept"
                  onClick={() => this.closeModal()}
                >
                  Accept
                </button>
              </footer>}
          </div>
        </div>
    );
  }
}

Modal.propTypes = {
  children: React.PropTypes.element.isRequired,
  // allows set close button
  closeable: React.PropTypes.bool,
  // sets default CSS classes used
  cssClasses: React.PropTypes.object,
  // allows set a footer into the modal
  hasFooter: React.PropTypes.bool,
  // determinates the visibility of the modal
  visibility: React.PropTypes.bool,
  // allows set a veil
  veil: React.PropTypes.bool
};

Modal.defaultProps = {
  closeable: true,
  cssClasses: {
    modal: 'c-vizz-modal',
    veil: 'veil',
    container: 'container',
    header: 'modal-header',
    btnClose: 'btn-close',
    content: 'content',
    footer: 'modal-footer'
  },
  veil: true,
  visibility: false
};

export default Modal;
