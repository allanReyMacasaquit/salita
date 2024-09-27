import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/sonner';
import ExitModal from '@/components/modals/ExitModal';

const nunito = Nunito({
	subsets: ['latin'], // Specify the character subsets (adjust as needed)
	variable: '--font-nunito', // Define the CSS variable for the font
	weight: ['200', '300', '400', '500', '600', '700', '800', '900'], // Set the font weight range (adjust as needed)
});

export const metadata: Metadata = {
	title: 'salita',
	description: 'Learn new words',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={`${nunito.variable}  antialiased`}>
					<ExitModal />
					<Toaster position='bottom-right' />
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
}
