import MobileHeader from '@/components/mobile/MobileHeader';
import Sidebar from '@/components/sidebar/Sidebar';

type Props = {
	children: React.ReactNode;
};
export default function MainLayout({ children }: Props) {
	return (
		<>
			<MobileHeader />
			<Sidebar className='hidden lg:flex' />
			<main
				className='
					lg:pl-[256px]
					h-full
					pt-[50px]
					lg:pt-0'
			>
				<div className='max-w-screen-2xl mx-auto h-full pt-8'>{children}</div>
			</main>
		</>
	);
}
