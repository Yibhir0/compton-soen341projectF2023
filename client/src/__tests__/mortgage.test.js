import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";
import MortgageForm from "../components/mortgage/mortgageform";
import userEvent from "@testing-library/user-event";


//Form testing that allows to test testing-library as well
test('Mortgage Loan Input Functions', () => {
    render(<MortgageForm/>)

    const inputLoan = screen.getByLabelText("Loan Amount:");

    fireEvent.change(inputLoan, {target:{value:50000}})

    expect(inputLoan.value).toBe("50000")
})

test('Mortgage Loan Calculator Output', () => {
    render(<MortgageForm/>)

    const inputLoan = screen.getByLabelText("Loan Amount:");
    const inDownPayment = screen.getByLabelText("Down Payment:");
    const inInterestRate = screen.getByLabelText("Interest Rate (%):");
    const inLoanTerm = screen.getByLabelText("Loan Term (Years):");



    fireEvent.change(inputLoan, {target:{value:500000}})
    fireEvent.change(inDownPayment, {target:{value:50000}})
    fireEvent.change(inInterestRate, {target:{value:5}})
    fireEvent.change(inLoanTerm, {target:{value:25}})

    fireEvent.click(screen.getByRole("button"))

    expect(screen.getByTestId("monthly-payment").textContent).toBe("Monthly Payment: $2630.66")
})

test('term years equal 0', () => {
    render(<MortgageForm/>)

    const inputLoan = screen.getByLabelText("Loan Amount:");
    const inDownPayment = screen.getByLabelText("Down Payment:");
    const inInterestRate = screen.getByLabelText("Interest Rate (%):");
    const inLoanTerm = screen.getByLabelText("Loan Term (Years):");



    fireEvent.change(inputLoan, {target:{value:500000}})
    fireEvent.change(inDownPayment, {target:{value:50000}})
    fireEvent.change(inInterestRate, {target:{value:5}})
    fireEvent.change(inLoanTerm, {target:{value:0}})

    fireEvent.click(screen.getByRole("button"))

    expect(screen.getByTestId("monthly-payment")).not.toBeInTheDocument();
})
