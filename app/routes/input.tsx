import { Form, Link, useLocation, useNavigate } from 'react-router';
import { Button } from '~/components/ui/button';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Label } from '~/components/ui/label';
import type { Route } from '../../.react-router/types/app/routes/+types/input';

const MONTHLY_CARE_ALLOWANCE_OPTIONS = [
  60000,
  90000,
  120000,
  150000,
  180000,
  210000,
  240000,
  270000,
  300000,
];

export async function loader({ params, request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const queryParams = url.searchParams;
  return {
    monthlyCareAllowance: queryParams.get('monthlyCareAllowance') ?? 150000,
  };
}

export default function Input({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const onChange = (event: React.FocusEvent<HTMLFormElement>) => {
    const params = new FormData(event.currentTarget);
    const urlSearch = new URLSearchParams();
    params.forEach((value, key) => {
      if (value) {
        urlSearch.append(key, `${value}`);
      }
    });
    navigate({ pathname: '/input', search: urlSearch.toString() }, {
      replace: true,
    });
  };

  return (
    <div>
      <h1 className="text-lg font-bold">
        Input
      </h1>
      <p>This is input page</p>
      <Form id="search-form" role="search" onChange={onChange}>
        <RadioGroup id="monthlyCareAllowance" name="monthlyCareAllowance" defaultValue={`${loaderData.monthlyCareAllowance}`}>
          {MONTHLY_CARE_ALLOWANCE_OPTIONS.map((option) => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={`${option}`} id={`radio-${option}`} />
              <Label htmlFor={`radio-${option}`}>{option / 100} €</Label>
            </div>
          ))}
        </RadioGroup>
      </Form>
      <Button asChild>
        <Link to={{pathname: "/result", search: location.search }} viewTransition>
          weiter zu result
        </Link>
      </Button>
    </div>
  )
}
