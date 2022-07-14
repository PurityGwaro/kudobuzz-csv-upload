import { Container } from "react-bootstrap";
import ListUploads from "./ListUploads";
import Navbar from "./Navbar";
import UploadButton from "./UploadButton";

export default function ClientUI() {
  return (
    <div>
      <Navbar />
      <Container>
        <UploadButton />
        <ListUploads />
      </Container>
    </div>
  );
}
