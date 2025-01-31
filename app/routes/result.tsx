import { data, useLoaderData, useNavigate } from 'react-router';
import React, { Suspense } from 'react';
import { Skeleton } from '~/components/ui/skeleton';
import type { ResultEntry } from '~/types/result.type';
import { Button } from '~/components/ui/button';
import type { Route } from '../../.react-router/types/app/routes/+types/result';


export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const queryParams = url.searchParams;

  const monthlyCareAllowance = queryParams.get('monthlyCareAllowance') ?? 150000;

  const slowResultRequest = await fetch(
    `https://pflegeversicherung.check24-test.de/api/v1/public/customer-frontend/calculation/tariffversions?birthdate=02.12.1997&monthlyCareAllowance=${monthlyCareAllowance}`,
    {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  ).then((res) => res.json());

  return data(
    { result: slowResultRequest },
    {
      headers: {
        'Cache-Control': 'max-age=3600, public',
      },
    },
  );
}

export function headers({ loaderHeaders }: Route.HeadersArgs) {
  return loaderHeaders;
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  const serverLoaderData = await serverLoader();

  return {
    result: serverLoaderData.result,
  }
}

clientLoader.hydrate = true as const;

export function HydrateFallback({}: Route.HydrateFallbackProps) {
  const navigate = useNavigate();
  return (
      <div>
        <h1 className="text-lg font-bold">Result</h1>
        <Button asChild onClick={() => navigate(-1)}>
          <span>input change</span>
        </Button>
        <ResultsSkeletons length = { 12 }/>
        <i>Bei diesem Beispiel flackern im iOs Device die ViewTransitions</i>
        <p>This is Result Page</p>
      </div>
    )
}

export default function Result({}: Route.ComponentProps) {
  const loaderData = useLoaderData();
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-lg font-bold">Result</h1>
      <Button asChild onClick={() => navigate(-1)}>
        <span>input change</span>
      </Button>
      <Suspense fallback={<ResultsSkeletons length={12}/>}>
        <ResultList results={loaderData.result}/>
      </Suspense>
      <i>Bei diesem Beispiel flackern im iOs Device die ViewTransitions</i>
      <p>This is Result Page</p>
    </div>
  );
}

const ResultList = ({ results }: { results: ResultEntry[] }) => (
  <div className="flex flex-col gap-4 m-4">
    {results.length > 0 && results.map((data: any) => (
      <div key={data.id}>
        <p>{data.id}</p>
        <p>{data.provider.name}</p>
        <p>{data.tariff.name}</p>
      </div>
    ))}
  </div>
);

const ResultsSkeletons = ({ length }: { length: number }) => {
  return (
    <div className="flex flex-col gap-4 m-4">
      {Array.from({ length }).map((_, i) => (
        <Skeleton key={i} className="w-full h-12"/>
      ))}
    </div>
  );
};
