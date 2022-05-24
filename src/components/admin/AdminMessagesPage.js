import Heading from "../layout/Heading";
import { useState, useEffect } from "react";
import { BASE_URL, MESSAGE_PATH } from "../../constants/api";
import useAxios from "../../hooks/useAxios";
import MessageItem from "./MessageItem";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = BASE_URL + MESSAGE_PATH;
  document.title = `Holidaze | Admin | Messages`;
  const http = useAxios();

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await http.get(url);
        console.log("response", response);
        setMessages(response.data);
      } catch (error) {
        console.log(error);
        setError("An error occurred:" + error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchMessages();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center m-5">
        <Spinner animation="border" />
      </div >
    );
  }

  if (error) {
    return <Alert variant="danger">An error occurred: {error}</Alert>;
  }

  return (
    <div className="inbox-container">
      <Heading content="Inbox" />
      <Container className="messages-container">
        {messages.map((messageItem) => {
          const { id, created_at, name, email, subject, message } = messageItem;
          const options = { year: "numeric", month: "short", day: "2-digit" };
          const newDate = new Date(created_at).toLocaleDateString("en-GB", options);
          return <MessageItem key={id} id={id} name={name} email={email} subject={subject} message={message} created_at={newDate} />
        })}
      </Container>
    </div>
  );
}