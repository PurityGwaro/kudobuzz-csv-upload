import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function UploadButton() {
  function handleClick() {
    window.location.href = '/upload';
  }

  return (
    <div>
        <Button variant="secondary" onClick={handleClick} className="btn">
          Upload CSV
        </Button>
    </div>
  )
}
