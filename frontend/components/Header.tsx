import { buttonVariants } from "@/components/ui/button";
import { Col, Grid, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import { WalletSelector } from "./WalletSelector";

const { Title } = Typography;
const { useBreakpoint } = Grid;

export function Header() {
  const screens = useBreakpoint();

  return (
    <Row align="middle" justify="space-between" className="w-full max-w-screen-xl px-6 py-4 mx-auto">
      <Col>
        {/* Header Title */}
        <Title level={screens.xs ? 3 : screens.sm ? 2 : 1} className="m-0">
          <Link to="/" style={{ fontFamily: "unset", color: "inherit" }}>
           LEASE.
          </Link>
        </Title>
      </Col>

      <Col>
        {/* Flex container with even spacing */}
        <div className="flex items-center justify-between gap-4">
          <Link
            className={`${buttonVariants({ variant: "link" })} w-24 text-center`} // Fixed width with center alignment
            to={"/for-landlords"}
          >
            LandLords
          </Link>
          <Link
            className={`${buttonVariants({ variant: "link" })} w-24 text-center`} // Fixed width with center alignment
            to={"/for-tenants"}
          >
            Tenants
          </Link>
          <div className="flex-shrink-0">
            <WalletSelector />
          </div>
        </div>
      </Col>
    </Row>
  );
}
