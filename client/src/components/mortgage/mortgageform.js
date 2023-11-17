import React, { useState } from 'react';
import './mortgageform.css';

const MortgageForm = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [annualInterestRate, setannualInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const calculateMonthlyPayment = () => {
    const principal = parseFloat(loanAmount) - parseFloat(downPayment);
    const monthlyInterestRate = parseFloat(annualInterestRate) / 100 / 12;
    const numberOfPayments = parseFloat(loanTerm) * 12;

    if (principal && monthlyInterestRate && numberOfPayments) {
      const monthlyPayment =
        (principal * (monthlyInterestRate * (Math.pow((1 + monthlyInterestRate), numberOfPayments)) / (Math.pow((1 + monthlyInterestRate), numberOfPayments) - 1)))

      setMonthlyPayment(monthlyPayment.toFixed(2));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    calculateMonthlyPayment();
  };

  return (
    <div className="mortgage-form-container">
      <h2>Mortgage Calculator</h2>
      <form onSubmit={handleFormSubmit}>
        <label>
          Loan Amount:
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Down Payment:
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
          />
        </label>
        <br />
        <label>
          Interest Rate (%):
          <input
            type="number"
            value={annualInterestRate}
            onChange={(e) => setannualInterestRate(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Loan Term (Years):
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Calculate</button>
      </form>

      {monthlyPayment !== null && (
        <div className="result-container">
          <h3>Result</h3>
          <p>Monthly Payment: ${monthlyPayment}</p>
        </div>
      )}
    </div>
  );
};

export default MortgageForm;
