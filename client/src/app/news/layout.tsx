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
          <Row gutter={[24, 16]}>
            <Col span={8}>{children}</Col>
            <Col span={8}>{children}</Col>
            <Col span={8}>{children}</Col>
            <Col span={8}>{children}</Col>
          </Row>
          <Row justify={'center'}><Pagination/></Row>
        </AppLayout>
    );
  }