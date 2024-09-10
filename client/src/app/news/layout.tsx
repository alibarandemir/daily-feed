import AppLayout from "@/components/Layouts/AppLayout";
export default function NewsLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
     
        <AppLayout>
            {children}
        </AppLayout>
    );
  }