import { Link, Outlet } from 'react-router';
import usePageShowInformation from '~/usePageShowInformation';
import { useTransitionsContext } from '~/components/transition-context';

export default function Layout() {
  const { transition, useScrollRestoration } = useTransitionsContext();
  return (
    <div>
      <div className="flex justify-between items-center gap-4 bg-blue-900 text-white p-2">
        <span>CHECK24 Wireframe</span>
        <div>
          <span className="text-xs block">useScrollRestoration: {useScrollRestoration ? 'true' : 'false'}</span>
          <span className="text-xs block">transition: {transition}</span>
        </div>
      </div>
      <div
        className="container m-auto"
      >
        <Outlet/>
      </div>
    </div>
  );
}
