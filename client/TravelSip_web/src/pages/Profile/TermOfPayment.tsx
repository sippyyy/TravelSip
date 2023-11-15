import { CollapseMenu } from "../../component";

const TermOfPayment = () => {
  return (
    <div className="mx-12 p-12 rounded-2xl bg-white">
      <h2 className="text-xLarge font-bold border-l-[10px] border-solid border-blue pl-8 ">
        Terms Of Payment
      </h2>
      <section className="my-20">
        <CollapseMenu
          label="1. Payment Terms:"
          list={[
            "The terms of payment for the goods/services provided by [Your Company Name] are outlined as follows:",
          ]}
        />
        <CollapseMenu
          label="2. Invoice and Due Date:"
          list={[
            "Invoices will be issued by [Your Company Name] for the products/services supplied.","The payment for each invoice is due within [number of days] days from the invoice date."
          ]}
        />
        <CollapseMenu
          label="3. Methods of Payment:"
          list={[
            "[Specify acceptable methods of payment, such as bank transfers, checks, credit cards, etc.]",
          ]}
        />
        <CollapseMenu
          label="4. Late Payments:"
          list={[
            "A late fee of [percentage]% will be charged on payments received after the due date.",
          ]}
        />
        <CollapseMenu
          label="5. Partial Payments:"
          list={[
            "Partial payments may be accepted only with prior written agreement.",
          ]}
        />
        <CollapseMenu
          label="6. Currency:"
          list={[
            "All transactions will be conducted in [specify currency].",
          ]}
        />
        <CollapseMenu
          label="7. Taxes:"
          list={[
            "The buyer is responsible for any applicable taxes related to the purchase.",
          ]}
        />
        <CollapseMenu
          label="8. Disputed Charges:"
          list={[
            "Any disputes regarding the charges must be reported within [number of days] days from the receipt of the invoice.",
          ]}
        />
        <CollapseMenu
          label="10. Confidentiality:"
          list={[
            "Both parties agree to keep all financial information exchanged confidential.",
          ]}
        />
        <CollapseMenu
          label="11. Governing Law:"
          list={[
            "This agreement shall be governed by and construed in accordance with the laws of [your jurisdiction].",
          ]}
        />
      </section>
    </div>
  );
};

export default TermOfPayment;
