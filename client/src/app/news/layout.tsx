import AppLayout from "@/components/Layouts/AppLayout";
import { Col, Pagination, Row } from "antd";
import '../globals.css'
import { ThemeProvider } from "next-themes";
export default function NewsLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <ThemeProvider attribute="class">
        <AppLayout>
           {/*grid yapısı ve pagination buraya eklenecek*/}
          <Row className="bg-gray-200 dark:bg-back" style={{marginTop:"30px"}} justify="start" gutter={[24, 40]}>
            
            {children}
          </Row>
        </AppLayout>
        </ThemeProvider>
    );
  }