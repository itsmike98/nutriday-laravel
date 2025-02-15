import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
export default function Dashboard() {
    const { auth } = usePage().props;
    const physicalData = auth.physicalData;

    const name = auth.user.name.split(" ");

    return (
        <AuthenticatedLayout
            header={
                <>
                    <div className='flex flex-row items-center gap-5'>
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

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-[#222] shadow-sm sm:rounded-lg">
                        <div className="p-6 text-white">

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
