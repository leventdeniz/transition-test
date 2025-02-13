import { Form, useSearchParams } from 'react-router';
import { Button } from '~/components/ui/button';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';
import { Label } from '~/components/ui/label';
import type { Route } from '../../.react-router/types/app/routes/+types/input';
import Link from '~/components/ui/link';

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

export async function clientLoader({ params, request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const queryParams = url.searchParams;
  return {
    monthlyCareAllowance: queryParams.get('monthlyCareAllowance') ?? 150000,
  };
}

export default function Input({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const onChange = (event: React.FocusEvent<HTMLFormElement>) => {
    const params = new FormData(event.currentTarget);
    const urlSearch = new URLSearchParams();
    params.forEach((value, key) => {
      if (value) {
        urlSearch.append(key, `${value}`);
      }
    });
    setSearchParams(urlSearch, { preventScrollReset: true, replace: true });
  };

  return (
    <div>
      <h1 className="text-lg font-bold">
        Input
      </h1>
      <p>This is input page</p>
      <Form id="search-form" role="search" onChange={onChange}>
        {Array.from({ length: 12 }, (_, index) => (
          <div className="bg-gray-50 rounded-lg p-4 m-4 text-gray-500 dark:bg-gray-600 dark:text-gray-100" key={index}>
            Test {index + 1}
          </div>
        ))}

        <RadioGroup
          id="monthlyCareAllowance"
          name="monthlyCareAllowance"
          defaultValue={`${loaderData.monthlyCareAllowance}`}
          className="gap-6 mx-4"
        >
          {MONTHLY_CARE_ALLOWANCE_OPTIONS.map((option) => (
            <div key={option} className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-lg px-4">
              <RadioGroupItem value={`${option}`} id={`radio-${option}`}/>
              <Label className="py-6 w-full" htmlFor={`radio-${option}`}>{option / 100} €</Label>
            </div>
          ))}
        </RadioGroup>
      </Form>
      <Button asChild className="p-2 m-4">
        <Link to={{ pathname: "/result", search: searchParams.toString() }} transitionName="page-default-forward" prefetch="viewport">
          weiter zu result
        </Link>
      </Button>
    </div>
  )
}
