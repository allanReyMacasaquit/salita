import Image from 'next/image';

function Promo() {
	return (
		<div
			className='
                border-2 
                rounded-xl 
                p-4 
                space-y-4'
		>
			<div
				className='
                    space-y-2'
			>
				<div
					className='
                        flex 
                        items-center 
                        gap-x-2'
				>
					<Image
						src='/images/user/unlimited_heart.svg'
						alt='unlimited heart'
						width={60}
						height={60}
						priority
					/>
				</div>
			</div>
			Promo
		</div>
	);
}
export default Promo;
