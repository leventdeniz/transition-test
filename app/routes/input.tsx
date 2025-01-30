import { Link } from 'react-router';
import { Button } from '~/components/ui/button';

export default function Input() {
  return (
    <div>
      <h1 className="text-lg font-bold">
        Input
      </h1>
      <p>This is input page</p>
      <Button asChild>
        <Link to="/result">weiter zu result</Link>
      </Button>
    </div>
  )
}
