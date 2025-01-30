import { Link, useLoaderData } from 'react-router';
import { waitForFetch } from '~/lib/time';
import React, { Suspense } from 'react';
import { Skeleton } from '~/components/ui/skeleton';
import type { ResultEntry } from '~/types/result.type';
import { Button } from '~/components/ui/button';

export async function loader() {
  // Hier wird nicht auf das Promise gewartet
  const slowResultRequest = waitForFetch<ResultEntry[]>(
    'https://pflegeversicherung.check24-test.de/api/v1/public/customer-frontend/calculation/tariffversions?birthdate=02.12.1997&monthlyCareAllowance=150000',
    {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    }, 1, 3);

  // Hier wird gewartet
  const criticalData = await new Promise((res) => setTimeout(() => res("critical"), 1000));

  return {
    result: slowResultRequest,
    criticalData,
  };
}

export default function Result() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="text-lg font-bold">Result</h1>
      <Button asChild>
        <Link to="/input">input change</Link>
      </Button>
      <Suspense fallback={<ResultsSkeletons length={12}/>}>
        <ResultList resultsPromise={loaderData.result} />
      </Suspense>
      <i>Bei diesem Beispiel flackern im iOs Device die ViewTransitions</i>
      <p>This is Result Page</p>
    </div>
  );
}

const ResultList = ({ resultsPromise }: { resultsPromise: Promise<ResultEntry[]> }) => {
  const results = React.use(resultsPromise);
  return (
    <div className="flex flex-col gap-4 m-4">
      {results && results.map((data: any) => (
        <div key={data.id}>
          <p>{data.id}</p>
          <p>{data.provider.name}</p>
          <p>{data.tariff.name}</p>
        </div>
      ))}
    </div>
  );
}

const ResultsSkeletons = ({ length }: { length: number }) => {
  return (
    <div className="flex flex-col gap-4 m-4">
      {Array.from({ length }).map((_, i) => (
        <Skeleton key={i} className="w-full h-12"/>
      ))}
    </div>
  );
};
