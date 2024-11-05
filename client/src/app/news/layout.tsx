import AppLayout from "@/components/Layouts/AppLayout";
import { Col, Pagination, Row } from "antd";
import '../globals.css'
export default function NewsLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <AppLayout>
           {/*grid yapısı ve pagination buraya eklenecek*/}
          <Row style={{marginTop:"30px"}} justify="start" gutter={[24, 40]}>
            
            {children}
          </Row>
        </AppLayout>
    );
  }