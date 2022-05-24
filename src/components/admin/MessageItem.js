import PropTypes from "prop-types";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function MessageItem({ id, name, email, created_at, subject, message }) {
  const [modalShow, setModalShow] = useState(false);

  function ViewMessageModal(props) {
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered className="messages-modal">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{subject}</h4>
          <p className="messages-modal__date">{created_at}</p>
          <p>
            {message}
          </p>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <>
      <Card key={id} className="messageItem-card">
        <Card.Header>
          <div className="card-header__name">{name}</div>
          <div className="card-header__email">{email}</div>
          <div className="card-header__date">{created_at}</div>
        </Card.Header>
        <Card.Body>
          <div className="card-body__subject">Subject: <br /><span>{subject}</span></div>
          <Button className="card-body__button" onClick={() => setModalShow(true)}>
            View message
          </Button>
        </Card.Body>
      </Card>
      <ViewMessageModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  )
}

MessageItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

MessageItem.defaultProps = {
  name: "Anonymous",
  subject: "Unknown"
}
