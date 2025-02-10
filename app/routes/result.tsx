import { data, useLoaderData, useLocation, useNavigate } from 'react-router';
import React, { Suspense, use, useEffect } from 'react';
import { Skeleton } from '~/components/ui/skeleton';
import type { ResultEntry } from '~/types/result.type';
import { Button } from '~/components/ui/button';
import type { Route } from '../../.react-router/types/app/routes/+types/result';
import cache from 'memory-cache';
import { useResultsContext } from '~/components/results-context';
import Link from '~/components/ui/link';
import getDummyData from '~/lib/dummy-data';

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const queryParams = url.searchParams;

  const monthlyCareAllowance = Number(queryParams.get('monthlyCareAllowance')) ?? 150000;
  const cachedUrl: ResultEntry[] = cache.get(request.url);
/*  if (cachedUrl) {
    const test: Promise<ResultEntry[]> =  new Promise((resolve) => setTimeout(() => resolve(cachedUrl), 1));
    await Promise.race([
     new Promise((resolve) => setTimeout(resolve, 30)),
     test,
   ]);

    return data({
      result: test,
    });
  }*/

  const slowResultRequest = getDummyData((monthlyCareAllowance / 10000));
/*
  await Promise.race([
   new Promise((resolve) => setTimeout(resolve, 30)),
   slowResultRequest,
 ]);*/

  cache.put(request.url, slowResultRequest, 1000 * 60 * 60);
  return data(
    { result: slowResultRequest },
    /*{
      headers: {
        'Cache-Control': 'max-age=3600, public',
      },
    }*/
  );
}

export function headers({ loaderHeaders }: Route.HeadersArgs) {
  return loaderHeaders;
}
/*export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  const serverLoaderData = await serverLoader();

  return {
    result: serverLoaderData.result,
  }
}*/

// clientLoader.hydrate = true as const;
/*
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
}*/

export default function Result({}: Route.ComponentProps) {
  const loaderData = useLoaderData();
  const location = useLocation();
  return (
    <div>
      <h1 className="text-lg font-bold">Result</h1>
      <Button asChild>
        <Link to='-1' transitionName="page-default-backward">
          <span>input change</span>
        </Link>
      </Button>
      <Suspense fallback={<ResultsSkeletons length={12}/>}>
        <ResultList resultsPromise={loaderData.result}/>
      </Suspense>
      <i>Bei diesem Beispiel flackern im iOs Device die ViewTransitions</i>
      <br />
      <Button asChild>
        <Link to='-1' transitionName="page-default-backward">
          <span>input change</span>
        </Link>
      </Button>
    </div>
  );
}

const ResultList = ({ resultsPromise }: { resultsPromise: Promise<ResultEntry[]> }) => {
  const { setter, value } = useResultsContext();
  const results = use(resultsPromise) || value || [];

  useEffect(() => {
    if (!results || results.length === 0) {
      return;
    }
    setter(results);
  }, [results, setter]);
  return (
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
};

const ResultsSkeletons = ({ length }: { length: number }) => {
  return (
    <div className="flex flex-col gap-4 m-4">
      {Array.from({ length }).map((_, i) => (
        <Skeleton key={i} className="w-full h-12"/>
      ))}
    </div>
  );
};
