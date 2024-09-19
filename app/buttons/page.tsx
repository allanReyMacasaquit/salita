import { Button } from '@/components/ui/button';

function ButtonsPage() {
	return (
		<div className=' p-4 space-y-4'>
			<div>
				<Button variant='default' className=''>
					Buttonspage
				</Button>
			</div>
			<div>
				<Button variant='primary'>Buttonspage</Button>
			</div>
			<div>
				<Button variant='primaryOutline'>Buttonspage</Button>
			</div>
			<div>
				<Button variant='secondary'>Buttonspage</Button>
			</div>
			<div>
				<Button variant='secondaryOutline'>Buttonspage</Button>
			</div>
			<div>
				<Button variant='danger'>Buttonspage</Button>
			</div>
			<div>
				<Button variant='dangerOutline'>Buttonspage</Button>
			</div>
			<div>
				<Button variant='super'>Buttonspage</Button>
			</div>
			<div>
				<Button variant='superOutline'>Buttonspage</Button>
			</div>
			<div>
				<Button variant='ghost'>Ghost Notes</Button>
			</div>
			<div>
				<Button variant='aside'>Aside</Button>
			</div>
			<div>
				<Button variant='asideOutline'>AsideOutline</Button>
			</div>
		</div>
	);
}
export default ButtonsPage;
