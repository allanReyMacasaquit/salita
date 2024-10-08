import { isAdmin } from '@/lib/admin';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

const App = dynamic(() => import('./App'), { ssr: false });
async function AdminPage() {
	const admin = isAdmin();

	if (!admin) {
		redirect('/');
	}
	return <App />;
}
export default AdminPage;
