import { MenuIcon } from 'lucide-react';
import Sidebar from '../sidebar/Sidebar';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

function MobileSidebar() {
	return (
		<nav>
			<Sheet>
				<SheetTrigger>
					<MenuIcon className='text-white' />
				</SheetTrigger>
				<SheetContent className='p-0 bg-white z-[100]' side='left'>
					<Sidebar />
				</SheetContent>
			</Sheet>
		</nav>
	);
}
export default MobileSidebar;
