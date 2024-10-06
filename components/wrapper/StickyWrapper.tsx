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
            lg:w-96
            w-full
            self-end
            bottom-10
         
            '
		>
			<div
				className='
                min-h-[calc(100vh-100px)]
                flex 
                flex-col
                sticky
                top-6
                gap-y-6
                
                border-b-2
                '
			>
				{children}
			</div>
		</div>
	);
}
export default StickyWrapper;
