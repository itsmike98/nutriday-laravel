import Layout from '../Layouts/Layout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UserInfoProfile from './Partials/UserInfoProfile';

function Edit({ mustVerifyEmail, status }) {
    return (
        <>
            <Head title="Profile" />

            <div className="py-5">
                <div className="mx-auto w-full max-w-[2000px] flex flex-col gap-5">
                        <UserInfoProfile />
                    <div className="bg-[#222] p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="bg-[#222] p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-[#222] p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </>
    );
}

Edit.layout = page => <Layout children={page} />;
export default Edit;