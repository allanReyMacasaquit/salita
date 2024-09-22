type Props = {
	children: React.ReactNode;
};
function FeedWrapper({ children }: Props) {
	return (
		<div
			className='
            relative
            flex-1
            top-0
            pb-10'
		>
			{children}
		</div>
	);
}
export default FeedWrapper;
