import { Await, data, useLoaderData, useLocation, useNavigate, useSearchParams } from 'react-router';
import React, { Suspense, use, useEffect } from 'react';
import { Skeleton } from '~/components/ui/skeleton';
import type { ResultEntry } from '~/types/result.type';
import { Button } from '~/components/ui/button';
import type { Route } from '../../.react-router/types/app/routes/+types/result';
import { useResultsContext } from '~/components/results-context';
import Link from '~/components/ui/link';
import getDummyData from '~/lib/dummy-data';
import cache from 'memory-cache';
import { clsx } from 'clsx';

export async function loader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const queryParams = url.searchParams;
  // console.log("test", url, queryParams);

  const monthlyCareAllowance = Number(queryParams.get('monthlyCareAllowance')) ?? 150000;
  const cachedUrl: ResultEntry[] = cache.get(request.url);
  if (cachedUrl) {
    const test: Promise<ResultEntry[]> =  new Promise((resolve) => setTimeout(() => resolve(cachedUrl), 1));

    await Promise.race([
     new Promise((resolve) => setTimeout(resolve, 50)),
     test,
   ]);

    return data({
      result: test,
    });
  }

  const slowResultRequest = await getDummyData((monthlyCareAllowance / 10000));

  await Promise.race([
   new Promise((resolve) => setTimeout(resolve, 50)),
   slowResultRequest,
 ]);

  cache.put(request.url, slowResultRequest, 1000 * 60 * 60);
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
/*export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  const serverLoaderData = await serverLoader();

  return {
    result: serverLoaderData.result,
  }
}

clientLoader.hydrate = true as const;*/
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
/*
const data = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  provider: { name: `Dummy Provider` },
  tariff: { name: `Dummy Tariff ${i}` },
}));*/

export default function Result({}: Route.ComponentProps) {
  const loaderData = useLoaderData<typeof loader>();
  // const url = new URL(window.location.href);
  // const queryParams = url.searchParams;
  //
  // const monthlyCareAllowance = Number(queryParams.get('monthlyCareAllowance')) ?? 150000;
  // const slowResultRequest = getDummyData((monthlyCareAllowance / 10000));

  return (
    <div>
      <h1 className="text-lg font-bold">Result</h1>
      <Button asChild>
        <Link to='-1' transitionName="page-default-backward">
          <span>input change</span>
        </Link>
      </Button>
      <ResultList results={loaderData.result} />
     {/* <Suspense>
        <Await resolve={new Promise((resolve) => setTimeout(resolve, 50))}>
          {() => (
            <Suspense fallback={<ResultsSkeletons length={30} />}>
              <ResultList resultsPromise={loaderData.result}/>
            </Suspense>
          )}
      </Await>
      </Suspense>*/}
      {/*<Suspense fallback={<ResultList results={[]} />}>
        <Await resolve={loaderData.result}>
          {(results) => <ResultList results={results} />}
        </Await>
      </Suspense>*/}
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

const ResultList = ({ results }: { results: ResultEntry[] }) => {
  const { setter, value } = useResultsContext();
  const [searchParams] = useSearchParams();
  const storeValue = value[searchParams.toString()];
  const lokalResults =
    (results &&  results.length > 0 ? results : null)
    // || (storeValue && storeValue.length > 0 ? storeValue : null)
    || [];

  useEffect(() => {
    if (!lokalResults || lokalResults.length === 0) {
      return;
    }
    setter(searchParams.toString(), lokalResults);
  }, [lokalResults, setter]);

  return (
    <div className="flex flex-col gap-4 m-4">
      {lokalResults.length > 0 ? (
        lokalResults.map((data: any) => (
          <div key={data.id}>
            <p>{data.id}</p>
            <p>{data.provider.name}</p>
            <p>{data.tariff.name}</p>
          </div>
        ))) : (
        <ResultsSkeletons length={25} className="m-0" />
      )}
    </div>
  );
};

const ResultsSkeletons = ({ length, className }: { length: number; className?: string }) => {
  return (
    <div className={clsx('flex flex-col gap-4 m-4', className)}>
      {Array.from({ length }).map((_, i) => (
        <Skeleton key={i} className="w-full h-12"/>
      ))}
    </div>
  );
};
