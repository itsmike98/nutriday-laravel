import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import Navigation from './Generic_components/Navigation';
import Calories from './Dashboard_components/Calories';

export default function Dashboard() {
    const { auth } = usePage().props;
    const physicalData = auth.physicalData;

    const name = auth.user.name.split(" ");

    return (
        <AuthenticatedLayout
            header={
                <>
                    <div className='flex flex-row items-center gap-5 mt-14'>
                        <img
                            src="/assets/images/willy.jpg"
                            alt="borrar"
                            className="max-w-14 h-14 object-cover rounded-full"
                        />
                        <h2 className="text-xl font-semibold leading-tight text-white">
                            Hello {name[0]}
                        </h2>
                    </div>

                </>

            }
        >
            <Head title="Dashboard" />
            <div className='w-full flex flex-col items-center'>
                <div className="pb-12 max-w-7xl w-full flex flex-col">
                    <Navigation page="Dashboard"/>
                    {/* contenedor de calorias y water */}
                    <div className='flex flex-row gap-5 pt-5'>
                        {/* calories container */}
                        <div className='bg-[#222] w-[65%] rounded-lg px-10 py-5 h-96'>
                            <h3 className='font-semibold text-[1.3em] pb-5'>Calories</h3>
                            <hr className='pb-5' />
                            <Calories />
                        </div>
                        {/* Water container  */}
                        <div className='bg-[#222] w-[35%] rounded-lg px-10 py-5 h-96'>
                            <h3 className='font-semibold text-[1.3em] pb-5'>Water</h3>
                            <hr className='pb-5' />
                        </div>
                    </div>
                    {/* macronutrients container */}
                    <div className='bg-[#222] w-full rounded-lg px-10 py-5 h-96 my-5'>
                        <h3 className='font-semibold text-[1.3em] pb-5'>Macronutrients</h3>
                        <hr className='pb-5' />
                    </div>

                    {/* contenedor de  */}
                    <div className='flex flex-row gap-5 pb-5'>
                        {/* calories container */}
                        <div className='bg-[#222] w-[35%] rounded-lg px-10 py-5 h-96'>
                            <h3 className='font-semibold text-[1.3em] pb-5'>Foods log</h3>
                            <hr className='pb-5' />
                        </div>
                        {/* Water container  */}
                        <div className='bg-[#222] w-[65%] rounded-lg px-10 py-5 h-96'>
                            <h3 className='font-semibold text-[1.3em] pb-5'>Follow-up</h3>
                            <hr className='pb-5' />
                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
