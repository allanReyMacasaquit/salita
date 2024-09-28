import Image from 'next/image';

type Props = {
	question: string;
};

function QuestionBubble({ question }: Props) {
	return (
		<div
			className='
                flex
                items-center
                gap-x-4
                mb-6'
		>
			<Image
				src='/book_1.svg'
				alt='book question'
				height={100}
				width={100}
				priority
				className='w-20 p-1 rounded-full border bg-gradient-to-tr from-green-500 to-blue-500'
			/>
			<div
				className='
                    relative
                    py-2
                    px-4
                    border-2
                    border-gray-300
                    rounded-tl-2xl
                    rounded-br-2xl
                    shadow-lg
                    drop-shadow-2xl
                    text-sm
                    lg:text-base'
			>
				{question}
				<div
					className='
                        absolute 
                        -left-3 
                        top-1/2 
                        w-0 
                        h-0
                        border-x-8
                        border-x-transparent
                        border-t-8
                        border-gray-500
                        transform
                        -translate-y-1/2 rotate-90
                        '
				/>
			</div>
		</div>
	);
}
export default QuestionBubble;
