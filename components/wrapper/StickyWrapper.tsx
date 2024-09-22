type Props = {
	children: React.ReactNode;
};

function StickyWrapper({ children }: Props) {
	return (
		<div
			className='
            sticky
            hidden
            lg:block
            w-1/3
            self-end
            bottom-10
            border
            rounded-2xl'
		>
			<div
				className='
                min-h-[calc(100vh-100px)]
                flex 
                flex-col
                sticky
                top-6
                gap-y-6
                shadow-lg
                border-b-2
                '
			>
				{children}
			</div>
		</div>
	);
}
export default StickyWrapper;
