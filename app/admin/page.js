'use client';

const AdminPage = () => {

    return (
        <div className=" min-h-screen w-full justify-center items-center text-gray-50 p-6 pt-20 max-w-3xl mx-auto text-center grid">
            <div className="flex flex-col justify-center items-center bg-neutral-900 shadow-md rounded-lg p-6 border">
                <h1>Admin Panel</h1>
            <a href="/admin/users" className="bg-neutral-800 rounded-sm mt-5 px-6 py-3 w-full">
                Manage Users
            </a>
            <a href="/admin/comments" className="bg-neutral-800 rounded-sm m-5 px-6 py-3 w-full">
                Manage Comments
            </a>
            <a href="/admin/posts" className="bg-neutral-800 rounded-sm m- px-6 py-3 w-full">
                Manage Posts
            </a>
            </div>
        </div>
    );
};

export default AdminPage;