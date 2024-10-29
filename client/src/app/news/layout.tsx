import AppLayout from "@/components/Layouts/AppLayout";
import { Col, Pagination, Row } from "antd";
export default function NewsLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <AppLayout>
           {/*grid yapısı ve pagination buraya eklenecek*/}
          <Row justify="center" gutter={[24, 40]}>
            {children}
          </Row>
        </AppLayout>
    );
  }