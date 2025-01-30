import { useLocation, useViewTransitionState } from 'react-router';

export default function Tds() {
  const transition = useViewTransitionState('/tds');

  return (
    <div
      style={{
        ...(transition && { viewTransitionName: 'page' }),
      }}
    >
      <h1 className="text-lg font-bold">TDS</h1>
      <p>This is TDS</p>
      {transition && <pre>{JSON.stringify(transition, null, 2)}</pre>}
    </div>
  );
}
