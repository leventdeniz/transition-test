import { Link, Outlet } from 'react-router';
import usePageShowInformation from '~/usePageShowInformation';

export default function Layout() {
  const { persisted } = usePageShowInformation();
  return (
    <div>
      <div className="flex justify-between items-center gap-4 bg-blue-900 text-white p-2">
        <span>CHECK24 Wireframe</span><span className="text-xs">bfcache: {persisted ? 'persisted' : 'not persisted'}</span>
      </div>
      <div
        className="container m-auto"
        style={{
          viewTransitionName: 'main-content',
        }}
      >
        <Outlet/>
      </div>
    </div>
  );
}
