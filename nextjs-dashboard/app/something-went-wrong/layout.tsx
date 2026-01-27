

export const metadata = {
    title: 'Error'
}

export default function SomethingWentWrongLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}