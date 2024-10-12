/* eslint-disable react-hooks/exhaustive-deps */
import { LaunchpadHeader } from "@/components/LaunchpadHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MODULE_ADDRESS } from "@/constants";
import { aptosClient } from "@/utils/aptosClient";
import { InputViewFunctionData } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Input as AntdInput, Form, InputNumber, message, notification, Select, Tag, Typography } from "antd";
import { useEffect, useState } from "react";
const { Paragraph } = Typography;

export function CreateCollection() {
  const { account, signAndSubmitTransaction } = useWallet();
  const [rentals, setRentals] = useState<RentalAgreement[]>([]);

  interface RentPayment {
    amount_paid: string;
    payment_time: string;
    period: string;
  }

  interface RentalAgreement {
    id: string;
    tenant: string;
    rent_amount: string;
    security_deposit: string;
    start_time: string;
    duration_months: string;
    rent_paid_until: string;
    is_rent_paid_current_period: boolean;
    agreement_type: string;
    agreement_description: string;
    rent_payments: RentPayment[];
  }
  const convertAmountFromHumanReadableToOnChain = (value: number, decimal: number) => {
    return value * Math.pow(10, decimal);
  };

  const convertAmountFromOnChainToHumanReadable = (value: number, decimal: number) => {
    return value / Math.pow(10, decimal);
  };

  const handleCreateRentalAgreements = async (values: {
    tenant_address: string;
    rent_amount: number;
    security_deposit: number;
    duration_months: number;
    agreement_type: string;
    agreement_description?: string;
  }) => {
    try {
      const rentAMT = convertAmountFromHumanReadableToOnChain(values.rent_amount, 8);
      const securityAMT = convertAmountFromHumanReadableToOnChain(values.security_deposit, 8);

      if (!values.agreement_description) {
        values.agreement_description = "None";
      }

      const transaction = await signAndSubmitTransaction({
        sender: account?.address,
        data: {
          function: `${MODULE_ADDRESS}::RentalAgreement::create_rental_agreement`,
          functionArguments: [
            values.tenant_address,
            rentAMT,
            securityAMT,
            values.duration_months,
            values.agreement_type,
            values.agreement_description,
          ],
        },
      });

      await aptosClient().waitForTransaction({ transactionHash: transaction.hash });
      message.success("Policy is Created Successfully!");
      notification.success({
        message: "Rental Agreement Created",
        description: `Transaction hash: ${transaction.hash}`,
      });
      fetchAllAgreementsByLandlord();
    } catch (error) {
      if (typeof error === "object" && error !== null && "code" in error && (error as { code: number }).code === 4001) {
        message.error("Transaction rejected by user.");
      } else {
        if (error instanceof Error) {
          console.error(`Transaction failed: ${error.message}`);
        } else {
          console.error("Transaction failed: Unknown error");
        }
        console.error("Transaction Error:", error);
      }
      console.log("Error creating Agreement.", error);
    }
  };

  const ProposeDeductions = async (values: {
    agreement_description: string;
    rental_id: string;
    deduction_amount: number;
    damage_description: string;
  }) => {
    try {
      const deductionAMT = convertAmountFromHumanReadableToOnChain(values.deduction_amount, 8);

      if (!values.agreement_description) {
        values.agreement_description = "None";
      }

      const transaction = await signAndSubmitTransaction({
        sender: account?.address,
        data: {
          function: `${MODULE_ADDRESS}::RentalAgreement::propose_deductions`,
          functionArguments: [values.rental_id, deductionAMT, values.damage_description],
        },
      });

      await aptosClient().waitForTransaction({ transactionHash: transaction.hash });
      message.success("Policy is Created Successfully!");
      notification.success({
        message: "Rental Agreement Created",
        description: `Transaction hash: ${transaction.hash}`,
      });
      fetchAllAgreementsByLandlord();
    } catch (error) {
      if (typeof error === "object" && error !== null && "code" in error && (error as { code: number }).code === 4001) {
        message.error("Transaction rejected by user.");
      } else {
        if (error instanceof Error) {
          console.error(`Transaction failed: ${error.message}`);
        } else {
          console.error("Transaction failed: Unknown error");
        }
        console.error("Transaction Error:", error);
      }
      console.log("Error creating Deductions.", error);
    }
  };

  const RefundSecurityDeposit = async (values: { rental_id: string }) => {
    try {
      const transaction = await signAndSubmitTransaction({
        sender: account?.address,
        data: {
          function: `${MODULE_ADDRESS}::RentalAgreement::refund_security_deposit`,
          functionArguments: [values.rental_id],
        },
      });

      await aptosClient().waitForTransaction({ transactionHash: transaction.hash });
      message.success("Security Deposit Refunded");
      notification.success({
        message: "Security Deposit Refunded",
        description: `Transaction hash: ${transaction.hash}`,
      });
      fetchAllAgreementsByLandlord();
    } catch (error) {
      if (typeof error === "object" && error !== null && "code" in error && (error as { code: number }).code === 4001) {
        message.error("Transaction rejected by user.");
      } else {
        if (error instanceof Error) {
          console.error(`Transaction failed: ${error.message}`);
        } else {
          console.error("Transaction failed: Unknown error");
        }
        console.error("Transaction Error:", error);
      }
      console.log("Error Refund security deposit.", error);
    }
  };

  const fetchAllAgreementsByLandlord = async () => {
    try {
      const WalletAddr = account?.address;
      const payload: InputViewFunctionData = {
        function: `${MODULE_ADDRESS}::RentalAgreement::view_rentals_by_landlord`,
        functionArguments: [WalletAddr],
      };

      const result = await aptosClient().view({ payload });

      const rentalList = result[0];

      if (Array.isArray(rentalList)) {
        setRentals(
          rentalList.map((rental) => ({
            id: rental.id,
            tenant: rental.tenant,
            rent_amount: rental.rent_amount,
            security_deposit: rental.security_deposit,
            start_time: rental.start_time,
            duration_months: rental.duration_months,
            rent_paid_until: rental.rent_paid_until,
            is_rent_paid_current_period: rental.is_rent_paid_current_period,
            agreement_type: rental.agreement_type,
            agreement_description: rental.agreement_description,
            rent_payments: rental.rent_payments.map(
              (payment: { amount_paid: string; payment_time: string; period: string }) => ({
                amount_paid: payment.amount_paid,
                payment_time: payment.payment_time,
                period: payment.period,
              }),
            ),
          })),
        );
      } else {
        setRentals([]);
      }
    } catch (error) {
      console.error("Failed to get Policies by address:", error);
    }
  };

  useEffect(() => {
    fetchAllAgreementsByLandlord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, fetchAllAgreementsByLandlord]);

  return (
    <>
      <LaunchpadHeader title="For Landlord" />
      <div className="flex flex-col items-center justify-center px-4 py-2 gap-4 max-w-screen-xl mx-auto">
        <div className="w-full flex flex-col gap-y-4">
          <Card>
            <CardHeader>
              <CardDescription>Create Agreement</CardDescription>
            </CardHeader>
            <CardContent>
              <Form
                onFinish={handleCreateRentalAgreements}
                labelCol={{
                  span: 4.04,
                }}
                wrapperCol={{
                  span: 100,
                }}
                layout="horizontal"
                style={{
                  maxWidth: 1000,
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  padding: "1.7rem",
                }}
              >
                <Form.Item label="Tenant Address" name="tenant_address" rules={[{ required: true }]}>
                  <Input placeholder="Enter tenant address" />
                </Form.Item>
                <Form.Item label="Rent Amount (APT)" name="rent_amount" rules={[{ required: true }]}>
                  <InputNumber className="w-full" />
                </Form.Item>
                <Form.Item label="Security Deposit (APT)" name="security_deposit" rules={[{ required: true }]}>
                  <InputNumber className="w-full" />
                </Form.Item>
                <Form.Item label="Duration (Months)" name="duration_months" rules={[{ required: true }]}>
                  <InputNumber className="w-full" />
                </Form.Item>

                <Form.Item name="agreement_type" label="Agreement Type" rules={[{ required: true }]}>
                  <Select>
                    <Select.Option value="Residential">Residential</Select.Option>
                    <Select.Option value="Commercial">Commercial</Select.Option>
                    <Select.Option value="Vehicle">Vehicle</Select.Option>
                    <Select.Option value="Equipment">Equipment</Select.Option>
                    <Select.Option value="Others">Others</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Agreement Description" name="agreement_description" rules={[{ required: true }]}>
                  <AntdInput.TextArea rows={4} placeholder="Describe the agreement details" />
                </Form.Item>

                <Form.Item>
                  <Button variant="submit" size="lg" className="text-base w-full" type="submit">
                    Create Agreement
                  </Button>
                </Form.Item>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Propose Deductions</CardDescription>
            </CardHeader>
            <CardContent>
              <Form
                onFinish={ProposeDeductions}
                labelCol={{
                  span: 4.04,
                }}
                wrapperCol={{
                  span: 100,
                }}
                layout="horizontal"
                style={{
                  maxWidth: 1000,
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  padding: "1.7rem",
                }}
              >
                <Form.Item label="Rental ID" name="rental_id" rules={[{ required: true }]}>
                  <Input placeholder="Enter rental agreement ID" />
                </Form.Item>
                <Form.Item label="Deduction Amount (APT)" name="deduction_amount" rules={[{ required: true }]}>
                  <InputNumber min={1} className="w-full" />
                </Form.Item>
                <Form.Item label="Damage Description" name="damage_description" rules={[{ required: true }]}>
                  <AntdInput.TextArea rows={4} placeholder="Describe the damage" />
                </Form.Item>

                <Form.Item>
                  <Button variant="submit" size="lg" className="text-base w-full" type="submit">
                    Propose Deductions
                  </Button>
                </Form.Item>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Refund Security Deposit</CardDescription>
            </CardHeader>
            <CardContent>
              <Form
                onFinish={RefundSecurityDeposit}
                labelCol={{
                  span: 4.04,
                }}
                wrapperCol={{
                  span: 100,
                }}
                layout="horizontal"
                style={{
                  maxWidth: 1000,
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.5rem",
                  padding: "1.7rem",
                }}
              >
                <Form.Item label="Rental ID" name="rental_id" rules={[{ required: true }]}>
                  <Input placeholder="Enter rental agreement ID" />
                </Form.Item>

                <Form.Item>
                  <Button variant="submit" size="lg" className="text-base w-full" type="submit">
                    Refund Deposit
                  </Button>
                </Form.Item>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardDescription>Get Agreements By Landlord</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-2">
                {rentals.map((rental, index) => (
                  <Card key={index} className="mb-6 shadow-lg p-4">
                    <p className="text-sm text-gray-500 mb-4">Rental ID: {rental.id}</p>
                    <Card style={{ marginTop: 16, padding: 16 }}>
                      {rental && (
                        <div>
                          <Paragraph>
                            <strong>Tenant:</strong> {rental.tenant}
                          </Paragraph>
                          <Paragraph>
                            <strong>Rent Amount:</strong>{" "}
                            <Tag>{convertAmountFromOnChainToHumanReadable(Number(rental.rent_amount), 8)}</Tag>
                          </Paragraph>
                          <Paragraph>
                            <strong>Security Deposit:</strong>{" "}
                            <Tag>{convertAmountFromOnChainToHumanReadable(Number(rental.security_deposit), 8)}</Tag>
                          </Paragraph>
                          <Paragraph>
                            <strong>Start Time:</strong> {rental.start_time}
                          </Paragraph>
                          <Paragraph>
                            <strong>Duration (Months):</strong> {rental.duration_months}
                          </Paragraph>
                          <Paragraph>
                            <strong>Rent Paid Until:</strong> {rental.rent_paid_until}
                          </Paragraph>
                          <Paragraph>
                            <strong>Is Rent Paid Current Period:</strong>{" "}
                            <Tag>{rental.is_rent_paid_current_period ? "Yes" : "No"}</Tag>
                          </Paragraph>
                          <Paragraph>
                            <strong>Agreement Type:</strong> {rental.agreement_type}
                          </Paragraph>
                          <Paragraph>
                            <strong>Agreement Description:</strong> {rental.agreement_description}
                          </Paragraph>
                          {rental.rent_payments.length > 0 ? (
                            <Card style={{ marginTop: 16, padding: 16 }}>
                              {rental.rent_payments.map((payment, idx) => (
                                <div key={idx} className="mb-4">
                                  <Paragraph>
                                    <strong>Amount Paid:</strong>{" "}
                                    <Tag>{convertAmountFromOnChainToHumanReadable(Number(payment.amount_paid), 8)}</Tag>
                                  </Paragraph>
                                  <Paragraph>
                                    <strong>Payment Time:</strong> {payment.payment_time}
                                  </Paragraph>
                                  <Paragraph>
                                    <strong>Period:</strong> {payment.period}
                                  </Paragraph>
                                </div>
                              ))}
                            </Card>
                          ) : (
                            <Paragraph>No Rent Payments Found for this Rental Agreement. </Paragraph>
                          )}
                        </div>
                      )}
                    </Card>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
