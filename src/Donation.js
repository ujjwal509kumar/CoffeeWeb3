import React, { useState, useEffect } from 'react';
import { Bounce, Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import web3 from './web3';

const Donation = () => {
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [isTransactionCompleted, setIsTransactionCompleted] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      setIsMetaMaskInstalled(true);
    } else {
      toast('👽Ew, Brother, Ew! Whats That?, Whats That Brother? Looks like you are trying to Web3 without MetaMask! Bro, thats about as smooth as trying to pet a cactus with your bare hands! Get a life bro, install some decent wallet to do transaction', {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }, []);

  const handleDonate = async () => {
    if (!isMetaMaskInstalled) {
      toast('👽Ew, Brother, Ew! Whats That?, Whats That Brother? Looks like you are trying to Web3 without MetaMask! Bro, thats about as smooth as trying to pet a cactus with your bare hands! Get a life bro, install some decent wallet to do transaction', {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    if (!name || !message) {
      toast.error('Name, Message and Amount are mandatory', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      return;
    }

    try {
      const accounts = await web3.eth.getAccounts();
      const transaction = await web3.eth.sendTransaction({
        from: accounts[0],
        to: process.env.REACT_APP_WALLET_KEY,
        value: web3.utils.toWei(amount, 'ether'),
        gas: 53000,
      });

      const newTransaction = {
        id: transaction.transactionHash,
        name,
        message,
        amount,
      };

      setTransactions([...transactions, newTransaction]);
      setIsTransactionCompleted(true);
      toast.success('My bank account might be crying, but my coffee mug is singing thanks to your amazing donation! ☕️  This cup is about to get a serious workout.  💪', {
        position: "top-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
      setAmount('');
      setName('');
      setMessage('');
    } catch (error) {
      toast.error('Donation Failed, Please try again', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-2 py-2 mx-auto flex justify-center items-center">
        <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-5 flex flex-col w-full mt-10 md:mt-0 relative z-10 shadow-md">
          {!isTransactionCompleted ? (
            <>
              <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Donate Sepolia ETH</h2>
              <p className="leading-relaxed mb-5 text-gray-600">A cup of coffee can make a developer happy. Please donate and keep me coding!</p>
              <div className="relative mb-4">
                <label htmlFor="name" className="leading-7 text-sm text-gray-600">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="message" className="leading-7 text-sm text-gray-600">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label htmlFor="amount" className="leading-7 text-sm text-gray-600">Amount in ETH</label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button
                onClick={handleDonate}
                className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Donate
              </button>
            </>
          ) : (
            <div className="mt-8 w-full">
              <h3 className="text-xl font-bold text-gray-900">Transaction Details</h3>
              <ul>
                {transactions.length === 0 ? (
                  <p>Section only available after transaction.</p>
                ) : (
                  transactions.map((tx) => (
                    <li key={tx.id} className="mt-2">
                      <strong>Name:</strong> {tx.name}<br />
                      <strong>Message:</strong> {tx.message}<br />
                      <strong>Amount:</strong> {tx.amount} ETH<br />
                      <strong>Transaction ID:</strong> {tx.id}
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </section> 
  );
};

export default Donation;
