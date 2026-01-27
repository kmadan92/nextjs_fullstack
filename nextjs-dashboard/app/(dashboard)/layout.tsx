
import SideNav from '@/components/dashboard/sidenav';

export const metadata = {
    title: 'Dashboard'
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="flex h-screen flex-col md:flex-row md:overflow-hidden"
            style={{ backgroundColor: '#FFFBF5' }} // Matches your login page background
        >
            <div className="w-full flex-none md:w-20">
                <SideNav />
            </div>

            <div className="grow p-6 md:overflow-y-auto md:p-12">
                {children}
            </div>
        </div>
    );
}