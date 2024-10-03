import { useState } from "react";
import { useAddTransactions } from "../../hooks/useAddTransactions";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { auth } from "../../config/firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./style.css";
// ExpenseTracker component
export const ExpenseTracker = () => {
  const { addTransactions } = useAddTransactions();
  const { transactions, transactionTotals } = useGetTransactions();
  const {name, profilePhoto} = useGetUserInfo();  

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");
  const navigate = useNavigate();
 
    const {balance, income, expenses} = transactionTotals;
  // adding tracstions to firestore after submit
  const onSubmit = (e) => {
    e.preventDefault();
    addTransactions({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount("");
  };

  const signUserOut = async () => {

    console.log("hello sognout");

    try {
        await signOut(auth);
        localStorage.clear();
        navigate("/");

    } catch (error) {

        console.error("error",error);
        
    }
  };

  return (
    <>
      <div className="expense-tracker">
        <div className="container">
          <h1>{name}'s Expense Tracker</h1>
          <div className="balance">
            <h3>Your Balance</h3>
            {balance >= 0 ? <h2> ${balance}</h2> : <h2> -${balance * -1}</h2>}
          </div>

          <div className="summary">
            <div className="income">
              <h4>income</h4>
              <p>${income}</p>
            </div>
            <div className="expenses">
              <h4>Expenses</h4>
              <p>${expenses}</p>
            </div>
          </div>

          <form action="" className="add-transaction">
            <input
              type="text"
              placeholder="Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              required
              onChange={(e) => setTransactionAmount(e.target.value)}
            />

            <input
              type="radio"
              id="expense"
              //   name="option"
              checked={transactionType === "expense"}
              value="expense"
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="expense">Expense</label>
            <input
              type="radio"
              id="income"
              //name="option"
              checked={transactionType === "income"}
              value="income"
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label htmlFor="income">Income</label>

            <button type="submit" onClick={onSubmit}>
              Add Transaction
            </button>
          </form>
        </div>

        {profilePhoto && (
            <div className="profile">
            <img src={profilePhoto} className="profile-photo" alt="profile" /> 

            <button className="sign-out-btn" onClick={signUserOut}>
                SignOut
            </button>
            
            </div>
        )}
      </div>
        <div className="transaction-container">
        <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <li>
                <h4>{description}</h4>
                <p>
                  ${transactionAmount} {" "}
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {" "}
                    {transactionType}{" "}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
        </div>
      
    </>
  );
};
