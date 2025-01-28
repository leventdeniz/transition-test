import { Link, Outlet } from 'react-router';
import usePageShowInformation from '~/usePageShowInformation';

export default function Layout() {
  const { persisted } = usePageShowInformation();
  return (
    <div>
      <div className="flex gap-4 bg-blue-700 text-white p-2">
        <Link to="/">home</Link>
        <Link to="page1">page1</Link>
        <Link to="page2">page2</Link>
        <Link to="page3">page3</Link>
      </div>
      <div
        className="container m-auto"
        style={{
          viewTransitionName: 'main-content',
        }}
      >
        {persisted ? 'persisted' : 'not persisted'}
        <Outlet/>
      </div>
    </div>
  );
}
