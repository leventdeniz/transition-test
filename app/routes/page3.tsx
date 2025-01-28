import { useLocation, useViewTransitionState } from 'react-router';

export default function Page3() {
  const transition = useViewTransitionState('/page3');

  return (
    <div
      style={{
        ...(transition && { viewTransitionName: 'page' }),
      }}
    >
      <h1 className="text-lg font-bold">Page 3</h1>
      <p>This is page 3</p>
      {transition && <pre>{JSON.stringify(transition, null, 2)}</pre>}
    </div>
  );
}
