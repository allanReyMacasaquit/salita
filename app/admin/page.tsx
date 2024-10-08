import dynamic from 'next/dynamic';

const App = dynamic(() => import('./App'), { ssr: false });
function AdminPage() {
	return <App />;
}
export default AdminPage;
